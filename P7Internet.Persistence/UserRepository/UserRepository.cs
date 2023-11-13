using System;
using System.Data;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using P7Internet.Persistence.Connection;
using P7Internet.Shared;

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

    /// <summary>
    /// Gets a user by username
    /// </summary>
    /// <param name="name"></param>
    /// <returns>Returns a user if found in the database otherwise 0</returns>
    public async Task<User> GetUser(string name)
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

    /// <summary>
    /// Gets a user by email
    /// </summary>
    /// <param name="email"></param>
    /// <returns>Returns true if the user is found in the database, otherwise null</returns>
    private async Task<User> GetUserByEmail(string email)
    {
        var query = $@"SELECT * FROM {TableName} WHERE Email = @email";
        var result = await Connection.QuerySingleOrDefaultAsync(query, new {email});
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

    /// <summary>
    /// Creates a user and store it in the database
    /// </summary>
    /// <param name="user"></param>
    /// <param name="password"></param>
    /// <returns>Returns true if successful E.g the number of rows affected is more than 0, otherwise false</returns>
    public async Task<bool> Upsert(User user, string password)
    {
        var checkIfUserExist = await GetUser(user.Name);
        if (checkIfUserExist != null)
            return false;
        var checkIfUserWithEmailExist = await GetUserByEmail(user.EmailAddress);
        if (checkIfUserWithEmailExist != null)
            return false;

        var query =
            $@"INSERT INTO {TableName} (Id, Name, Email, Password_hash, Password_salt, Creation_date, EmailConfirmed, Updated)
                            VALUES (@Id, @Name, @Email, @PasswordHash, @PasswordSalt, @CreatedAt, false, @UpdatedAt)";
        var salt = GenerateSalt();
        var parameters = new
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.EmailAddress,
            PasswordHash = GenerateHash(password + salt),
            PasswordSalt = salt,
            CreatedAt = user.CreatedAt,
            UpdatedAt = DateTime.UtcNow,
        };
        return await Connection.ExecuteAsync(query, parameters) > 0;
    }

    /// <summary>
    /// Login a user by username and password
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <returns>Returns a user if the login was successful, otherwise null</returns>
    public async Task<User> LogIn(string userName, string password)
    {
        var query = $@"SELECT * FROM {TableName} WHERE Name = @userName";

        var result = await Connection.QueryFirstOrDefaultAsync(query, new {userName});

        if (result != null)
        {
            var salt = result.Password_salt;
            var passwordHash = GenerateHash(password + salt);
            if (passwordHash == result.Password_hash)
            {
                return GetUser(userName).Result;
            }
        }

        return null;
    }

    /// <summary>
    /// Confirms an email bu setting the EmailConfirmed column to true in the database
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="emailAddress"></param>
    /// <returns>Returns true if successful E.g the number of rows affected is more than 0, otherwise false</returns>
    public async Task<bool> ConfirmEmail(string userName, string emailAddress)
    {
        var query = $@"UPDATE {TableName} SET EmailConfirmed = true WHERE Name = @Name AND Email = @Email";
        var result = await Connection.ExecuteAsync(query, new {Name = userName, Email = emailAddress});
        return result > 0;
    }

    /// <summary>
    /// Resets the password of a user, must be directed to said site from an email
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <returns>Returns true if the process is successful, otherwise false also false if no user is found</returns>
    public async Task<bool> ResetPassword(string userName, string password)
    {
        var user = await GetUser(userName);
        if (user == null)
            return false;

        var query =
            $@"UPDATE {TableName} SET Password_hash = @passwordHash, Password_salt = @passwordSalt, Updated = @Updated WHERE Name = @userName";
        var salt = GenerateSalt();
        var passwordHash = GenerateHash(password + salt);
        var result = await Connection.ExecuteAsync(query,
            new {Name = userName, Password_hash = passwordHash, Password_salt = salt, Updated = DateTime.UtcNow});
        return result > 0;
    }

    /// <summary>
    /// Changes the password of a user, if the old password matches the correct password stores in the database
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="oldPassword"></param>
    /// <param name="newPassword"></param>
    /// <returns>Returns true if the old password was correct and false if not</returns>
    public async Task<bool> ChangePassword(string userName, string oldPassword, string newPassword)
    {
        var user = await GetUser(userName);
        if (user == null)
            return false;
        var oldPasswordHash = GenerateHash(oldPassword + user.PasswordSalt);
        if (oldPasswordHash != user.PasswordHash)
        {
            return false;
        }

        var query =
            $@"UPDATE {TableName} SET Password_hash = @Password_hash, Password_salt = @Password_salt, Updated = @Updated WHERE Id = @Id";

        var salt = GenerateSalt();
        var passwordHash = GenerateHash(newPassword + salt);

        var parameters = new
        {
            Id = user.Id,
            Password_hash = passwordHash,
            Password_salt = salt,
            Updated = DateTime.UtcNow,
        };

        var result = await Connection.ExecuteAsync(query, parameters);

        return result > 0;
    }

    /// <summary>
    /// Creates a user from a username and email (Helper function)
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="email"></param>
    /// <returns>Returns the created user of type User</returns>
    public User CreateUser(string userName, string email)
    {
        User user = new User(userName, email);
        return user;
    }

    /// <summary>
    /// Generates a hash from a string
    /// </summary>
    /// <param name="source"></param>
    /// <returns>Returns the hashed value as a string</returns>
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

    /// <summary>
    /// Generates a salt
    /// </summary>
    /// <returns>Returns a salt as a string</returns>
    private string GenerateSalt()
    {
        var random = RandomNumberGenerator.Create();
        byte[] buffer = new byte[32];
        random.GetBytes(buffer);
        string salt = BitConverter.ToString(buffer);
        return salt;
    }
}