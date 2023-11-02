using System;

namespace P7Internet.Requests;

public class ChangePasswordRequest
{
    public Guid UserId { get; set; }
    public string SessionToken { get; set; }
    public string UserName { get; set; }
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }

    public ChangePasswordRequest()
    {
    }

    public ChangePasswordRequest(Guid userId, string sessionToken,string userName, string oldPassword, string newPassword)
    {
        UserName = userName;
        OldPassword = oldPassword;
        NewPassword = newPassword;
    }
}