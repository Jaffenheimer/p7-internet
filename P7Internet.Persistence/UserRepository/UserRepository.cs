using System;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using SharedObjects;

namespace P7Internet.Persistence.UserRepository;

public class UserRepository : IUserRepository
{
    private static readonly string TableName = "UserTable";
    private readonly IDbConnectionFactory _connectionFactory;
    private IDbConnection Connection => _connectionFactory.Connection;

    public UserRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    private async Task<User> GetUser(string name)
    {
        var query = $@"SELECT * FROM {TableName} WHERE Name = @name";
        var result = await Connection.QuerySingleOrDefaultAsync(query, new {name});
        if (result != null)
        {
            var user = new User(result.Name, result.Email);
            user.Id = Guid.Parse(result.Id);
            user.PasswordHash = result.Password_hash;
            user.PasswordSalt = result.Password_salt;
            user.CreatedAt = result.Creation_date;
            return user;
        }
        return null;
    }

    public async Task<bool> Upsert(User user, string password)
    {
        var checkIfUserExist = await GetUser(user.Name);
        if(checkIfUserExist != null)
            return false;
        
            var query = $@"INSERT INTO {TableName} (Id, Name, Email, Password_hash, Password_salt, Creation_date, Updated)
                            VALUES (@Id, @Name, @Email, @PasswordHash, @PasswordSalt, @CreatedAt, @UpdatedAt)";
            var salt = GenerateSalt();
            var parameters = new
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.EmailAddress,
                PasswordHash = GenerateHash(password+salt),
                PasswordSalt = salt,
                CreatedAt = user.CreatedAt,
                UpdatedAt = DateTime.UtcNow,
            };
            return await Connection.ExecuteAsync(query, parameters) > 0;
        
    }

    public async Task<User> LogIn(string userName, string password)
    {
        var query = $@"SELECT * FROM {TableName} WHERE Name = @userName";
        
        var result = await Connection.QuerySingleAsync(query, new {userName});
        
        if (result != null)
        {
            var salt = result.Password_salt;
            var passwordHash = GenerateHash(password+salt);
            if (passwordHash == result.Password_hash)
            {
                return GetUser(userName).Result;
            }
        }
        return null;
    }

    public User CreateUser(string userName, string email)
    {
        User user = new User(userName, email);
        return user;
    }
    private static string GenerateHash(string source)
    {
        //Generates hash from string
        SHA256 sha256 = SHA256.Create();
        byte[] tmpSource = Encoding.UTF8.GetBytes(source);
        var tmpHash = sha256.ComputeHash(tmpSource);

        //Assembles the hash as a string from the byte[]
        StringBuilder sb = new StringBuilder();
        foreach (byte b in tmpHash)
            sb.Append(b.ToString("X2"));

        return sb.ToString();
    }
    private string GenerateSalt()
    {
        var random = RandomNumberGenerator.Create();
        byte[] buffer = new byte[32];
        random.GetBytes(buffer);
        string salt = BitConverter.ToString(buffer);
        return salt;
    }
}