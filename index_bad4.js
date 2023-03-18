const { JWT } = require("google-auth-library");
const path = require("path");
const fs = require("fs");
//THE PATH TO YOUR SERVICE ACCOUNT CRENDETIALS JSON FILE

const SECRET_FILE = "gmail-api-poc-380809-583fc07156fa.json";
const jsonCredentialsPath = path.join(__dirname, "secret", SECRET_FILE);
const keys = JSON.parse(fs.readFileSync(jsonCredentialsPath, "utf8"));
const USER_EMAIL = "nathan@nathankrasney.com";


async function main() {
  const client = new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({url});
  console.log(res.data);
}


main().catch(console.error);
