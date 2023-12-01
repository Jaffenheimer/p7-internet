﻿using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace P7Internet.Services;

public class EmailServiceMock
{
    private readonly SendGridClient _client;

    public EmailServiceMock()
    {
    }

    /// <summary>
    /// Sends an email to the user with a link to Confirm the email
    /// There is no return value to this function
    /// </summary>
    /// <param name="email"></param>
    /// <param name="userName"></param>
    public async Task<SendGridMessage> ConfirmEmail(string email, string userName)
    {
        var from = new EmailAddress($"jonathanwisborgfog@gmail.com", "P7Internet");
        var subject = "Please confirm your email";
        var to = new EmailAddress($"{email}", $"{userName}");
        var plainTextContent = "Please confirm your email!";
        var htmlContent =
            "<!DOCTYPE html>\n<html>\n<head>\n\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n  <title>Email Confirmation</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <style type=\"text/css\">\n  /**\n   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.\n   */\n  @media screen {\n    @font-face {\n      font-family: 'Source Sans Pro';\n      font-style: normal;\n      font-weight: 400;\n      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');\n    }\n    @font-face {\n      font-family: 'Source Sans Pro';\n      font-style: normal;\n      font-weight: 700;\n      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');\n    }\n  }\n  /**\n   * Avoid browser level font resizing.\n   * 1. Windows Mobile\n   * 2. iOS / OSX\n   */\n  body,\n  table,\n  td,\n  a {\n    -ms-text-size-adjust: 100%; /* 1 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n  }\n  /**\n   * Remove extra space added to tables and cells in Outlook.\n   */\n  table,\n  td {\n    mso-table-rspace: 0pt;\n    mso-table-lspace: 0pt;\n  }\n  /**\n   * Better fluid images in Internet Explorer.\n   */\n  img {\n    -ms-interpolation-mode: bicubic;\n  }\n  /**\n   * Remove blue links for iOS devices.\n   */\n  a[x-apple-data-detectors] {\n    font-family: inherit !important;\n    font-size: inherit !important;\n    font-weight: inherit !important;\n    line-height: inherit !important;\n    color: inherit !important;\n    text-decoration: none !important;\n  }\n  /**\n   * Fix centering issues in Android 4.4.\n   */\n  div[style*=\"margin: 16px 0;\"] {\n    margin: 0 !important;\n  }\n  body {\n    width: 100% !important;\n    height: 100% !important;\n    padding: 0 !important;\n    margin: 0 !important;\n  }\n  /**\n   * Collapse table borders to avoid space between cells.\n   */\n  table {\n    border-collapse: collapse !important;\n  }\n  a {\n    color: #1a82e2;\n  }\n  img {\n    height: auto;\n    line-height: 100%;\n    text-decoration: none;\n    border: 0;\n    outline: none;\n  }\n  </style>\n\n</head>\n<body style=\"background-color: #e9ecef;\">\n  </div>\n  <!-- end preheader -->\n\n  <!-- start body -->\n  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n\n    <!-- start logo -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n          <tr>\n            <td align=\"center\" valign=\"top\" style=\"padding: 36px 24px;\">\n              <a href=\"https://www.blogdesire.com\" target=\"_blank\" style=\"display: inline-block;\">\n                <img src=\"https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png\" alt=\"Logo\" border=\"0\" width=\"48\" style=\"display: block; width: 48px; max-width: 48px; min-width: 48px;\">\n              </a>\n            </td>\n          </tr>\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end logo -->\n\n    <!-- start hero -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;\">\n              <h1 style=\"margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;\">Confirm Your Email Address</h1>\n            </td>\n          </tr>\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end hero -->\n\n    <!-- start copy block -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n\n          <!-- start copy -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\">\n              <p style=\"margin: 0;\">Tap the button below to confirm your email address. If you didn't create an account with <a href=\"Her skal der være et redirect link\">P7-Internet</a>, you can safely delete this email.</p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n          <!-- start button -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\">\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                <tr>\n                  <td align=\"center\" bgcolor=\"#ffffff\" style=\"padding: 12px;\">\n                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n                      <tr>\n                        <td align=\"center\" bgcolor=\"#1a82e2\" style=\"border-radius: 6px;\">\n                          <a href=\"https://www.blogdesire.com\" target=\"_blank\" style=\"display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;\">Confirm Your Email</a>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n          <!-- end button -->\n\n          <!-- start copy -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\">\n              <p style=\"margin: 0;\">If that doesn't work, copy and paste the following link in your browser:</p>\n              <p style=\"margin: 0;\"><a href=\"Her skal der være et redirect link\" target=\"_blank\">Her skal der være et redirect link</a></p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n          <!-- start copy -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf\">\n              <p style=\"margin: 0;\">Cheers,<br> P7-Internet </p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end copy block -->\n\n    <!-- start footer -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 24px;\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n\n          <!-- start permission -->\n          <tr>\n            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n              <p style=\"margin: 0;\">You received this email because we received a request for confirmation of you email for your account. If you didn't create an account you can safely delete this email.</p>\n            </td>\n          </tr>\n          <!-- end permission -->\n\n          <!-- start unsubscribe -->\n          <tr>\n            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n              <p style=\"margin: 0;\">To stop receiving these emails, you can <a href=\"herskalderværeenredirect\" target=\"_blank\">unsubscribe</a> at any time.</p>\n              <p style=\"margin: 0;\">P7-Internet, Selma Lagerløfs Vej 300, 9220 Aalborg</p>\n            </td>\n          </tr>\n          <!-- end unsubscribe -->\n\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end footer -->\n\n  </table>\n  <!-- end body -->\n\n</body>\n</html>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        return msg;
    }

    /// <summary>
    /// Sends an email to the user with a link to reset the password
    /// There is no return value to this function
    /// </summary>
    /// <param name="email"></param>
    /// <param name="userName"></param>
    public async Task<SendGridMessage> ResetPassword(string email, string userName)
    {
        var from = new EmailAddress($"jonathanwisborgfog@gmail.com", "P7Internet");
        var subject = "Reset Password has been requested";
        var to = new EmailAddress($"{email}", $"{userName}");
        var plainTextContent = "Please confirm your email!";
        var htmlContent =
            "<!DOCTYPE html>\n<html>\n<head>\n\n  <meta charset=\"utf-8\">\n  <meta http-equiv=\"x-ua-compatible\" content=\"ie=edge\">\n  <title>Password Reset requested</title>\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <style type=\"text/css\">\n  /**\n   * Google webfonts. Recommended to include the .woff version for cross-client compatibility.\n   */\n  @media screen {\n    @font-face {\n      font-family: 'Source Sans Pro';\n      font-style: normal;\n      font-weight: 400;\n      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');\n    }\n    @font-face {\n      font-family: 'Source Sans Pro';\n      font-style: normal;\n      font-weight: 700;\n      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');\n    }\n  }\n  /**\n   * Avoid browser level font resizing.\n   * 1. Windows Mobile\n   * 2. iOS / OSX\n   */\n  body,\n  table,\n  td,\n  a {\n    -ms-text-size-adjust: 100%; /* 1 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n  }\n  /**\n   * Remove extra space added to tables and cells in Outlook.\n   */\n  table,\n  td {\n    mso-table-rspace: 0pt;\n    mso-table-lspace: 0pt;\n  }\n  /**\n   * Better fluid images in Internet Explorer.\n   */\n  img {\n    -ms-interpolation-mode: bicubic;\n  }\n  /**\n   * Remove blue links for iOS devices.\n   */\n  a[x-apple-data-detectors] {\n    font-family: inherit !important;\n    font-size: inherit !important;\n    font-weight: inherit !important;\n    line-height: inherit !important;\n    color: inherit !important;\n    text-decoration: none !important;\n  }\n  /**\n   * Fix centering issues in Android 4.4.\n   */\n  div[style*=\"margin: 16px 0;\"] {\n    margin: 0 !important;\n  }\n  body {\n    width: 100% !important;\n    height: 100% !important;\n    padding: 0 !important;\n    margin: 0 !important;\n  }\n  /**\n   * Collapse table borders to avoid space between cells.\n   */\n  table {\n    border-collapse: collapse !important;\n  }\n  a {\n    color: #1a82e2;\n  }\n  img {\n    height: auto;\n    line-height: 100%;\n    text-decoration: none;\n    border: 0;\n    outline: none;\n  }\n  </style>\n\n</head>\n<body style=\"background-color: #e9ecef;\">\n  </div>\n  <!-- end preheader -->\n\n  <!-- start body -->\n  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n\n    <!-- start logo -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n          <tr>\n            <td align=\"center\" valign=\"top\" style=\"padding: 36px 24px;\">\n              <a href=\"https://www.blogdesire.com\" target=\"_blank\" style=\"display: inline-block;\">\n                <img src=\"https://www.blogdesire.com/wp-content/uploads/2019/07/blogdesire-1.png\" alt=\"Logo\" border=\"0\" width=\"48\" style=\"display: block; width: 48px; max-width: 48px; min-width: 48px;\">\n              </a>\n            </td>\n          </tr>\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end logo -->\n\n    <!-- start hero -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;\">\n              <h1 style=\"margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;\">Password reset requested</h1>\n            </td>\n          </tr>\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end hero -->\n\n    <!-- start copy block -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n\n          <!-- start copy -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\">\n              <p style=\"margin: 0;\">You have requested to reset your password. Tap the button below to reset your password. If you didn't create an account with <a href=\"Her skal der være et redirect link\">P7-Internet</a>, you can safely delete this email.</p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n          <!-- start button -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\">\n              <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n                <tr>\n                  <td align=\"center\" bgcolor=\"#ffffff\" style=\"padding: 12px;\">\n                    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\">\n                      <tr>\n                        <td align=\"center\" bgcolor=\"#1a82e2\" style=\"border-radius: 6px;\">\n                          <a href=\"https://www.blogdesire.com\" target=\"_blank\" style=\"display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;\">Reset Password</a>\n                        </td>\n                      </tr>\n                    </table>\n                  </td>\n                </tr>\n              </table>\n            </td>\n          </tr>\n          <!-- end button -->\n\n          <!-- start copy -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;\">\n              <p style=\"margin: 0;\">If that doesn't work, copy and paste the following link in your browser:</p>\n              <p style=\"margin: 0;\"><a href=\"Her skal der være et redirect link\" target=\"_blank\">Her skal der være et redirect link</a></p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n          <!-- start copy -->\n          <tr>\n            <td align=\"left\" bgcolor=\"#ffffff\" style=\"padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf\">\n              <p style=\"margin: 0;\">Cheers,<br> P7-Internet </p>\n            </td>\n          </tr>\n          <!-- end copy -->\n\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end copy block -->\n\n    <!-- start footer -->\n    <tr>\n      <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 24px;\">\n        <!--[if (gte mso 9)|(IE)]>\n        <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\">\n        <tr>\n        <td align=\"center\" valign=\"top\" width=\"600\">\n        <![endif]-->\n        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\">\n\n          <!-- start permission -->\n          <tr>\n            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n              <p style=\"margin: 0;\">You received this email because we received a request for your password to be reset for your account. If you dont have an account or requested this you can safely delete this email.</p>\n            </td>\n          </tr>\n          <!-- end permission -->\n\n          <!-- start unsubscribe -->\n          <tr>\n            <td align=\"center\" bgcolor=\"#e9ecef\" style=\"padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;\">\n              <p style=\"margin: 0;\">To stop receiving these emails, you can <a href=\"herskalderværeenredirect\" target=\"_blank\">unsubscribe</a> at any time.</p>\n              <p style=\"margin: 0;\">P7-Internet, Selma Lagerløfs Vej 300, 9220 Aalborg</p>\n            </td>\n          </tr>\n          <!-- end unsubscribe -->\n\n        </table>\n        <!--[if (gte mso 9)|(IE)]>\n        </td>\n        </tr>\n        </table>\n        <![endif]-->\n      </td>\n    </tr>\n    <!-- end footer -->\n\n  </table>\n  <!-- end body -->\n\n</body>\n</html>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        return msg;
    }
}