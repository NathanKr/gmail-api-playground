const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const path = require("path");

const SECRET_FILE = "gmail-api-poc-380809-583fc07156fa.json";
const jsonCredentialsPath = path.join(__dirname, "secret", SECRET_FILE);


const SERVICE_ACCOUNT_EMAIL = 'nathan@nathankrasney.com';
const SERVICE_ACCOUNT_KEY_FILE = jsonCredentialsPath;
const GMAIL_FROM = 'nathan@nathankrasney.com';
const GMAIL_TO = 'nathan@nathankrasney.com';

const sendEmail = async (subject, message) => {
  try {
    // Create a JWT client for authorization
    const auth = new JWT({
      email: SERVICE_ACCOUNT_EMAIL,
      keyFile: SERVICE_ACCOUNT_KEY_FILE,
      scopes: ['https://www.googleapis.com/auth/gmail.send'],
    });

    // Authorize the client and create a Gmail API client
    const client = await google.gmail({
      version: 'v1',
      auth,
    });

    // Create a message object
    const messageParts = [
      `From: ${GMAIL_FROM}`,
      `To: ${GMAIL_TO}`,
      `Subject: ${subject}`,
      '',
      `${message}`,
    ];
    const messageText = messageParts.join('\n');
    const messageBase64 = Buffer.from(messageText).toString('base64');
    const messageObject = {
      raw: messageBase64,
    };

    // Send the message
    const response = await client.users.messages.send({
      userId: 'me',
      resource: messageObject,
    });
    console.log('Message sent:', response.data);

    // Return the response
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Example usage
sendEmail('Test Subject', 'Hello, this is a test message!')
  .then(() => console.log('Email sent successfully!'))
  .catch(() => console.error('Email sending failed.'));
