namespace P7Internet.Requests;

public class ResetPasswordEmailRequest
{
    public string Email { get; set; }

    public ResetPasswordEmailRequest()
    {
    }

    public ResetPasswordEmailRequest(string email)
    {
        Email = email;
    }
}