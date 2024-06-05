import bcrypt from "bcrypt";
import { createTransport } from "nodemailer";
export const hashPassword = async (args: {
  plaintextPassword: string;
}): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(args.plaintextPassword, saltRounds, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
  return hashedPassword;
};

export async function comparePasswordToHash(args: {
  plaintextPassword: string;
  hash: string;
}): Promise<{
  isEqual: boolean;
}> {
  const isEqual = await bcrypt.compare(args.plaintextPassword, args.hash);
  return {
    isEqual,
  };
}

export function sendEmail(args: { recipient_email: string; url: string }) {
  return new Promise((resolve, reject) => {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: args.recipient_email,
      subject: "CAMP49 PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
  <html lang="en" >
  <head>
    <meta charset="UTF-8">
    <title>Email</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Camp49</a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Thank you for choosing Camp49. Please click on the button below to complete your password recovery process , link in valid for 5 minutes</p>
      <a href="${args.url}" style="background: #00466a;margin: 0 auto;width: max-content;padding: 10px 10px;color: #fff;border-radius: 4px;">RESET PASSWORD</a>
      <a href="${args.url}" >${args.url}</a>
      <p style="font-size:0.9em;">Regards,<br />Camp49</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>Camp49</p>
        
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`,
    };
    transporter.sendMail(mail_configs, function (error) {
      if (error) {
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}
