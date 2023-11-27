using System;
using System.Threading.Tasks;
using P7Internet.Shared;

namespace P7Internet.Persistence.UserRepository;

public interface IUserRepository
{
    /// <summary>
    /// Gets a user from a user id
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>Returns a user of type user</returns>
    public Task<User> GetUserFromId(Guid userId);

    /// <summary>
    /// Gets a user by username
    /// </summary>
    /// <param name="name"></param>
    /// <returns>Returns a user if found in the database otherwise 0</returns>
    public Task<User> GetUser(string name);

    /// <summary>
    /// Gets a user by email
    /// </summary>
    /// <param name="email"></param>
    /// <returns>Returns true if the user is found in the database, otherwise null</returns>
    public Task<User> GetUserByEmail(string email);

    /// <summary>
    /// Creates a user and store it in the database
    /// </summary>
    /// <param name="user"></param>
    /// <param name="password"></param>
    /// <returns>Returns true if successful E.g the number of rows affected is more than 0, otherwise false</returns>
    public Task<bool> Upsert(User user, string password);

    /// <summary>
    /// Login a user by username and password
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="password"></param>
    /// <returns>Returns a user if the login was successful, otherwise null</returns>
    public Task<User> LogIn(string userName, string password);

    /// <summary>
    /// Creates a user from a username and email (Helper function)
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="email"></param>
    /// <returns>Returns the created user of type User</returns>
    public User CreateUser(string userName, string email);

    /// <summary>
    /// Confirms an email bu setting the EmailConfirmed column to true in the database
    /// </summary>
    /// <param name="userName"></param>
    /// <param name="emailAddress"></param>
    /// <returns>Returns true if successful E.g the number of rows affected is more than 0, otherwise false</returns>
    public Task<bool> ConfirmEmail(string userName, string emailAdress);

    /// <summary>
    /// Resets the password of a user, must be directed to said site from an email
    /// </summary>
    /// <param name="email"></param>
    /// <param name="password"></param>
    /// <returns>Returns true if the process is successful, otherwise false also false if no user is found</returns>
    public Task<bool> ResetPassword(string email, string password);

    /// <summary>
    /// Changes the password of a user, if the old password matches the correct password stores in the database
    /// </summary>
    /// <param name="email"></param>
    /// <param name="oldPassword"></param>
    /// <param name="newPassword"></param>
    /// <returns>Returns true if the old password was correct and false if not</returns>
    public Task<bool> ChangePassword(string userName, string oldPassword, string newPassword);
}