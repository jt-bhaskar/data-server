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

const SPREADSHEET_ID = '1ey46-QXDP6nPIN-z6Mz04UMK182wrdvEKc-c2Mbc000';
const SHEET_NAME = 'Sheet1';

async function saveToSheet(inputData) {
    const authClient = await auth.getClient();

    const existingHeadersResponse = await sheets.spreadsheets.values.get({
        auth: authClient,
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEET_NAME}!A1:Z1`
    });

    const existingHeaders = existingHeadersResponse.data.values ? existingHeadersResponse.data.values[0] : [];


    const rows = [
        ['Name', 'Mobile', 'Email', 'Gender', 'City', 'Has Consent', 'Submitted At']
    ];

    const questions = [];
    for (const sectionKey in inputData.response) {
        const section = inputData.response[sectionKey];
        section.forEach(entry => {
            questions.push(entry.question);
        });
    }

    if (existingHeaders.length === 0) {
        rows[0] = [...rows[0], ...questions];
    } else {
        rows.length = 0;
    }
    const submittedAt = getCurrentISTTime();  // Get the current IST time
    const userInfo = [inputData.name, inputData.mobile, inputData.email, inputData.gender, inputData.city, inputData.has_consent, submittedAt];

    const answers = [];
    for (const sectionKey in inputData.response) {
        const section = inputData.response[sectionKey];
        section.forEach(entry => {
            answers.push(entry.value);
        });
    }

    rows.push([...userInfo, ...answers]);

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