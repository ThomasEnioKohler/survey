# Survey CustomElement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0.
Added material with `ng add @angular/material`

## Development server
Run `npm run serve:static`
Navigate to `http://localhost:9080/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build:elements` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

See https://www.telerik.com/blogs/getting-started-with-angular-elements

See https://www.youtube.com/watch?v=Z1gLFPLVJjY

See https://www.heise.de/developer/artikel/Dynamische-Dashboards-mit-Angular-Elements-4122931.html

for styling

See https://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/

See https://css-tricks.com/playing-shadow-dom/

See https://stackoverflow.com/questions/51164303/angular-elements-dependency-on-material

See https://alligator.io/web-components/styling-custom-elements/

## Code for azure function
```csharp
#r "Newtonsoft.Json"

using System;
using System.Net;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static async Task<IActionResult> Run(HttpRequest req, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    string jsonContent = await new StreamReader(req.Body).ReadToEndAsync();
    log.LogInformation("JSON Content:" + jsonContent);
    dynamic data = JsonConvert.DeserializeObject(jsonContent);
    
    // do some data validation... skipped this for demo purpose only.
    // if validation failes -> HttpStatusCode.BadRequest should be returned as HTTP Status
    
    bool isImportantEmail = bool.Parse(data.isImportant.ToString());
    string fromEmail = data.fromEmail;
    log.LogInformation($"fromEmail: '{fromEmail}'");
    string toEmail = data.toEmail;
    log.LogInformation($"toEmail: '{toEmail}'");
    int smtpPort = 587;
    bool smtpEnableSsl = true;
    string smtpHost = "smtp"; // your smtp host
    string smtpUser = "mail@mail.com"; // your smtp user
    string smtpPass = "password"; // your smtp password
    string subject = data.subject;
    string message = data.message;
        
    SmtpClient client = new SmtpClient();
    client.Port = smtpPort;
    client.EnableSsl = smtpEnableSsl;
    client.DeliveryMethod = SmtpDeliveryMethod.Network;
    client.UseDefaultCredentials = false;
    client.Host = smtpHost;
    client.Credentials = new System.Net.NetworkCredential(smtpUser, smtpPass);

    MailMessage mail = new MailMessage(fromEmail, toEmail);
    mail.IsBodyHtml = true;
    mail.Subject = subject;
    mail.Body = message;
    if (isImportantEmail) {
      mail.Priority = MailPriority.High;
    }
    mail.Body = message;

    try {
      client.Send(mail);
      log.LogInformation($"Email sent to '{toEmail}'.");
      return (ActionResult)new OkObjectResult("");      
    }
    catch (Exception ex) {
      log.LogInformation(ex.ToString());
      return (ActionResult)new BadRequestObjectResult("Message has not been sent. Check Azure Function Logs for more information."); 
    }
}

```
