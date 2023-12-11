using System;

namespace P7Internet.Requests;

/// <summary>
/// 
/// </summary>
/// <param name="userName"></param>
/// <param name="emailAddress"></param>
public class ConfirmEmailRequest
{
    public Guid UserId { get; set; }
    public string VerificationCode { get; set; }

    public ConfirmEmailRequest()
    {
    }

    public ConfirmEmailRequest(Guid userName, string verificationCode)
    {
        UserId = userName;
        VerificationCode = verificationCode;
    }
}