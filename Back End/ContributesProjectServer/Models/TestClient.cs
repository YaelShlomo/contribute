using System;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
namespace ContributesProjectServer.Models
{

    namespace TestClient
    {
        class Program
        {
            public static void Main(string[] args)
            {
                var email = new MimeMessage();

                email.From.Add(new MailboxAddress("Sender Name", "shlomovitz.yael@gmail.com"));
                email.To.Add(new MailboxAddress("Receiver Name", "yaelfrank100@gmail.com"));

                email.Subject = "Testing out email sending";
                email.Body = new TextPart(MimeKit.Text.TextFormat.Html)
                {
                    Text = "<b>Hello all the way from the land of C#</b>"
                };

                using (var smtp = new SmtpClient())
                {
                    smtp.Connect("smtp.server.address", 587, false);

                    // Note: only needed if the SMTP server requires authentication
                    //smtp.Authenticate("smtp_username", "smtp_password");

                    smtp.Send(email);
                    smtp.Disconnect(true);
                }
            }
        }
    }
}
