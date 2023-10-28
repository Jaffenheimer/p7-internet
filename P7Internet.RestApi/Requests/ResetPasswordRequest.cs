namespace P7Internet.Requests;

public class ResetPasswordRequest
{
    public string UserName { get; set; }
    public string Password { get; set; }

    public ResetPasswordRequest()
    {
        
    }
    
    public ResetPasswordRequest(string userName, string password)
    {
        UserName = userName;
        Password = password;
    }
    
}