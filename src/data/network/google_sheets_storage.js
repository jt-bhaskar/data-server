const { google } = require('googleapis');
const sheets = google.sheets('v4');
const fs = require('fs');
const path = require('path');
const {getCurrentISTTime} = require("../../utils/utils");

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json')));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const SPREADSHEET_ID = '153dEVQPdXnoEBiS2rtPmTSszBR4-OnIRt-WFnG60xng';
const SHEET_NAME = 'Sheet1';

async function saveToSheet(inputData) {
    const authClient = await auth.getClient();

    // Getting existing headers in the sheet
    const existingHeadersResponse = await sheets.spreadsheets.values.get({
        auth: authClient,
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:Z1`
    });

    // Checking if we have headers or not
    const existingHeaders = existingHeadersResponse.data.values ? existingHeadersResponse.data.values[0] : [];

    const rows = [];

    if (existingHeaders.length === 0) {
        const arr = []
        inputData.forEach(entry => {
            arr.push(entry.label);
        });
        arr.push('Submitted At')
        rows.push(arr)
    }

    // Getting the current IST time
    const submittedAt = getCurrentISTTime();


    const values = [];

    inputData.forEach(entry => {
        values.push(entry.value);
    });

    values.push(submittedAt)

    rows.push(values);

    console.log(rows)

    await sheets.spreadsheets.values.append({
        auth: authClient,
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: rows,
        },
    });

    console.log('Data saved to Google Sheets successfully!');
}

module.exports = {
    saveToSheet
}