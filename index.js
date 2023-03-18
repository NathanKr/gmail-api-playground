// --- chat GPT code tweaked

const fs = require("fs");
const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const path = require("path");


const SECRET_FILE = "gmail-api-poc-380809-583fc07156fa.json";
const jsonCredentialsPath = path.join(__dirname, "secret", SECRET_FILE);
const keys = JSON.parse(fs.readFileSync(jsonCredentialsPath, "utf8"));

const WORKSPACE_EMAIL = "nathan@nathankrasney.com"
const GMAIL_FROM = WORKSPACE_EMAIL;
const GMAIL_TO = "natankrasney@gmail.com";// sent success but email is wrong
const USER_EMAIL = WORKSPACE_EMAIL;



const sendEmail = async (subject, message) => {
  try {
    const auth = new JWT({
        email: keys.client_email,
        key: keys.private_key,
        scopes: [
        'https://www.googleapis.com/auth/gmail.send',],
        subject: USER_EMAIL,
      });

    // Authorize the client and create a Gmail API client
    const client = await google.gmail({
      version: "v1",
      auth,
    });

    // Create a message object
    const messageParts = [
      `From: ${GMAIL_FROM}`,
      `To: ${GMAIL_TO}`,
      `Subject: ${subject}`,
      "",
      `${message}`,
    ];
    const messageText = messageParts.join("\n");
    const messageBase64 = Buffer.from(messageText).toString("base64");
    const messageObject = {
      raw: messageBase64,
    };

    // Send the message
    const response = await client.users.messages.send({
      userId: "me",
      resource: messageObject,
    });
    console.log("Message sent:", response.data);

    // Return the response
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// Example usage
sendEmail("Test Subject", "Hello, this is a test message!")
  .then(() => console.log("Email sent successfully!"))
  .catch(() => console.error("Email sending failed."));
