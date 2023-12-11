using System;

namespace P7Internet.Requests;
public class DeleteUser
{
    public Guid UserId { get; set; }
    public string SessionToken {  get; set; }

    public DeleteUser()
    {
                
    }

    public DeleteUser(Guid userId, string sessionToken)
    {
        UserId = userId;
        SessionToken = sessionToken;
    }


}
