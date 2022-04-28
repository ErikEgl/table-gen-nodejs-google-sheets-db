const express = require("express");
const { google } = require("googleapis");

const app = express();

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1EdG5f4aqZe8qKZIlgLKhFh-DqfPKzcBZr0jdGJxIdyE";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const detRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "data_sheet!A:A",
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "data_sheet!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [
        ["add a cell data", "test"],
        ["add a cell data2", "test2"],
      ],
    },
  });

  res.send(detRows.data);
});

app.listen(1337, (req, res) => console.log("running on 1337"));
