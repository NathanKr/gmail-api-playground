const { GoogleAuth } = require("google-auth-library");
const path = require("path");
const fs = require("fs");
const { google } = require("googleapis");

const SECRET_FILE = "gmail-api-poc-380809-583fc07156fa.json";

async function runSample() {
  const gmail = google.gmail("v1");

  const jsonCredentialsPath = path.join(__dirname, "secret", SECRET_FILE);
  const credentials = JSON.parse(fs.readFileSync(jsonCredentialsPath, "utf8"));
  // --- how to connect to next part ????????????????
  const auth = new GoogleAuth({ credentials });

  // You can use UTF-8 encoding for the subject using the method below.
  // You can also just use a plain string if you don't need anything fancy.
  const subject = "🤘 Hello 🤘";
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
  const myEmail = "nathan@nathankrasney.com";
  const messageParts = [
    `From: Justin Beckwith <${myEmail}>`,
    `To: Justin Beckwith <${myEmail}>`,
    "Content-Type: text/html; charset=utf-8",
    "MIME-Version: 1.0",
    `Subject: ${utf8Subject}`,
    "",
    "This is a message just to say hello.",
    "So... <b>Hello!</b>  🤘❤️😎",
  ];
  const message = messageParts.join("\n");

  // The body needs to be base64url encoded.
  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const res = await gmail.users.messages.send({
    // userId: 'me',
    userId: myEmail,
    requestBody: {
      raw: encodedMessage,
    },
  });
  console.log(res.data);
}

runSample();
