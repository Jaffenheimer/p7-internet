using Google.Protobuf.Reflection;
using System;
using System.Security.Policy;
using System.Security.Cryptography;
using System.Text;
using System.Security;

namespace SharedObjects;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string EmailAddress { get; set; }
    public string PasswordHash { get; set; }
    public string PasswordSalt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    public User(string name, string emailAddress, string password)
    {
        Id = Guid.NewGuid();
        Name = name;
        EmailAddress = emailAddress;
        PasswordSalt = GenerateSalt();
        PasswordHash = GenerateHash(password+PasswordSalt);
        CreatedAt = DateTime.UtcNow;
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