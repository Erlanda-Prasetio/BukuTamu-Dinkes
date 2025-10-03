# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets as a database for the guest book form.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Buku Tamu Dinkes" or any name you prefer
4. In the first row (header), add these columns:
   - `Timestamp` (Column A)
   - `Nama` (Column B)
   - `Email` (Column C)
   - `Telepon` (Column D)
   - `Subjek` (Column E)
   - `Pesan` (Column F)
5. Copy the Spreadsheet ID from the URL:
   - Example URL: `https://docs.google.com/spreadsheets/d/1ABC-xyz123_SPREADSHEET_ID/edit`
   - Copy the part: `1ABC-xyz123_SPREADSHEET_ID`

## Step 2: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it something like "Dinkes Buku Tamu"

## Step 3: Enable Google Sheets API

1. In your Google Cloud project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and click **Enable**

## Step 4: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Fill in:
   - Service account name: `dinkes-sheets-api`
   - Service account ID: (auto-generated)
   - Description: "Service account for Buku Tamu"
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 5: Create and Download Key

1. In the **Credentials** page, find your newly created service account
2. Click on the service account email
3. Go to the **Keys** tab
4. Click **Add Key** → **Create new key**
5. Choose **JSON** format
6. Click **Create** - a JSON file will be downloaded
7. **Important**: Keep this file secure and never commit it to GitHub!

## Step 6: Share Google Sheet with Service Account

1. Open your Google Sheet from Step 1
2. Click the **Share** button (top right)
3. Copy the **client_email** from the downloaded JSON file (looks like: `your-service-account@your-project.iam.gserviceaccount.com`)
4. Paste it in the Share dialog
5. Give it **Editor** access
6. Uncheck "Notify people"
7. Click **Share**

## Step 7: Setup Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and fill in:
   
   **GOOGLE_SHEETS_CREDENTIALS**: Copy the entire content of the JSON file you downloaded in Step 5. It should be on a single line or properly escaped.
   
   Example:
   ```
   GOOGLE_SHEETS_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"xxx",...}
   ```

   **GOOGLE_SHEETS_ID**: Paste the Spreadsheet ID from Step 1
   
   Example:
   ```
   GOOGLE_SHEETS_ID=1ABC-xyz123_SPREADSHEET_ID
   ```

## Step 8: Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. In **Environment Variables**, add:
   - `GOOGLE_SHEETS_CREDENTIALS` (paste the entire JSON)
   - `GOOGLE_SHEETS_ID` (paste your spreadsheet ID)
5. Deploy!

## Testing Locally

1. Make sure you have `.env.local` configured
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Go to `http://localhost:3000`
4. Fill out and submit the guest book form
5. Check your Google Sheet - the data should appear!

## Troubleshooting

### Error: "Missing Google Sheets configuration"
- Make sure both environment variables are set correctly
- Check that the JSON credentials are valid
- Ensure there are no extra spaces or line breaks

### Error: "The caller does not have permission"
- Make sure you shared the Google Sheet with the service account email
- The service account needs **Editor** access

### Data not appearing in sheet
- Check the console for errors
- Verify the Sheet ID is correct
- Make sure Sheet1 exists in your spreadsheet
- Check that the service account has access

## Security Notes

- Never commit `.env.local` or the JSON credentials file to Git
- Keep your service account credentials secure
- Only share the Google Sheet with necessary service accounts
- Regularly rotate your service account keys for production use

## Support

For issues or questions, please contact the development team.
