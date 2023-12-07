namespace P7Internet.Requests;

public class ResetPasswordRequest
{
    public string Password { get; set; }
    public string VerificationCode { get; set; }

    public ResetPasswordRequest()
    {
        
    }
    public ResetPasswordRequest(string password, string verificationCode)
    {
        Password = password;
        VerificationCode = verificationCode;
    }
}