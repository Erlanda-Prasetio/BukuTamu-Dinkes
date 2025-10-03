# How to Fix Your .env.local File

The error indicates that your GOOGLE_SHEETS_CREDENTIALS is not formatted correctly.

## The Problem
The credentials JSON must be on a **single line** with no line breaks.

## Solution

Your `.env.local` file should look like this:

```
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project-id","private_key_id":"key-id","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@project.iam.gserviceaccount.com","client_id":"123456","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40project.iam.gserviceaccount.com"}

GOOGLE_SHEETS_ID=your_spreadsheet_id
```

## Step-by-Step Fix:

1. Open your downloaded JSON credentials file
2. Copy the **entire contents** of that file
3. Go to https://www.freeformatter.com/json-formatter.html (or use VS Code)
4. Paste the JSON and select "Compact" or "Minified" format
5. Copy the minified (single-line) JSON
6. In your `.env.local` file:
   ```
   GOOGLE_SHEETS_CREDENTIALS=<paste the minified JSON here>
   ```

## Important Notes:

- No quotes around the JSON value
- No spaces after the `=` sign
- Everything on ONE line
- The `\n` in the private_key should remain as `\n` (literal backslash-n)

## Example of CORRECT format:

```
GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"dinkes-123","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...REST_OF_KEY...ABCD\n-----END PRIVATE KEY-----\n","client_email":"sheets@dinkes-123.iam.gserviceaccount.com"}
```

## After fixing:

1. Save the `.env.local` file
2. Restart your dev server (stop with Ctrl+C and run `npm run dev` again)
3. Try submitting the form again

The server will now show better error messages if there are still issues!
