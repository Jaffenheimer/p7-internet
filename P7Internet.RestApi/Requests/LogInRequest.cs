namespace P7Internet.Requests;

public class LogInRequest
{
    public string Username { get; set; }
    public string Password { get; set; }

    public LogInRequest()
    {
    }

    public LogInRequest(string username, string password)
    {
        Username = username;
        Password = password;
    }
}