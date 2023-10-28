namespace P7Internet.Requests;

public class ChangePasswordRequest
{
    public string UserName { get; set; }
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }

    public ChangePasswordRequest()
    {
        
    }

    public ChangePasswordRequest(string userName, string oldPassword, string newPassword)
    {
        UserName = userName;
        OldPassword = oldPassword;
        NewPassword = newPassword;
    }
}