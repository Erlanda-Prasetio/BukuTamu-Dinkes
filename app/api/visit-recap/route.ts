import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const selectedDate = searchParams.get('date');

    // Get Google Sheets credentials from environment variables
    const credentialsString = process.env.GOOGLE_SHEETS_CREDENTIALS;
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

    if (!credentialsString || !spreadsheetId) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    let credentials;
    try {
      credentials = JSON.parse(credentialsString);
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid credentials format' },
        { status: 500 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: credentials.client_email,
        private_key: credentials.private_key.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Get all data from Sheet1
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:G',
    });

    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      return NextResponse.json({
        totalVisits: 0,
        filteredVisits: 0,
        earliestDate: null,
      });
    }

    // Parse dates and count visits
    let totalVisits = rows.length;
    let filteredVisits = 0;
    let earliestDate: Date | null = null;
    const dateSet = new Set<string>();

    rows.forEach((row) => {
      const timestampStr = row[0];
      if (!timestampStr) return;

      // Parse Indonesian date format (e.g., "3/10/2025, 10.27.04")
      const dateMatch = timestampStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
      if (dateMatch) {
        const day = parseInt(dateMatch[1]);
        const month = parseInt(dateMatch[2]) - 1; // JavaScript months are 0-indexed
        const year = parseInt(dateMatch[3]);
        const rowDate = new Date(year, month, day);

        // Track earliest date
        if (!earliestDate || rowDate < earliestDate) {
          earliestDate = rowDate;
        }

        // Add date to set (format: YYYY-MM-DD)
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dateSet.add(dateStr);

        // Count filtered visits if date is selected
        if (selectedDate) {
          const selected = new Date(selectedDate);
          selected.setHours(0, 0, 0, 0);
          rowDate.setHours(0, 0, 0, 0);
          
          if (rowDate.getTime() === selected.getTime()) {
            filteredVisits++;
          }
        }
      }
    });

    return NextResponse.json({
      totalVisits,
      filteredVisits: selectedDate ? filteredVisits : totalVisits,
      earliestDate: earliestDate ? earliestDate.toISOString().split('T')[0] : null,
      availableDates: Array.from(dateSet).sort((a, b) => new Date(b).getTime() - new Date(a).getTime()),
    } as { totalVisits: number; filteredVisits: number; earliestDate: string | null; availableDates: string[] });
  } catch (error) {
    console.error('Error reading from Google Sheets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch visit data' },
      { status: 500 }
    );
  }
}
