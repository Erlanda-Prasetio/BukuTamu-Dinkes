import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, institution, subject, message } = body;

    // Validate required fields
    if (!name || !email || !institution || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Google Sheets credentials from environment variables
    const credentialsString = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!credentialsString || !spreadsheetId) {
      console.error('Missing Google Sheets configuration');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    let credentials;
    try {
      credentials = JSON.parse(credentialsString);
    } catch (parseError) {
      console.error('Failed to parse credentials:', parseError);
      console.error('Credentials string:', credentialsString?.substring(0, 50));
      return NextResponse.json(
        { error: 'Invalid credentials format' },
        { status: 500 }
      );
    }

    if (!credentials.client_email || !credentials.private_key) {
      console.error('Missing required credential fields');
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 500 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get current timestamp
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
    });

    // Append data to Google Sheets
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:G', // Updated range to include institution
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name, email, phone || '-', institution, subject, message]],
      },
    });

    console.log('Data successfully saved to Google Sheets:', appendResponse.data);

    return NextResponse.json(
      { message: 'Data berhasil disimpan', success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Gagal menyimpan data', success: false },
      { status: 500 }
    );
  }
}
