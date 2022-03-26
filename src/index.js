const { GoogleSpreadsheet } = require("google-spreadsheet");

const fs = require("fs");

const RES_SHEET_ID = "12cQU4sw3Z76QjKwgZHvzSpWJ63RgpKcaVPOxQCsb7hA";

const newDocument = new GoogleSpreadsheet(RES_SHEET_ID);

const CREDENTIALS = JSON.parse(
  fs.readFileSync("web-scrapying-345223-b42591b674bb.json")
);

const getRow = async (empresa) => {
  await newDocument.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await newDocument.loadInfo();

  let sheet = newDocument.sheetsByIndex[0];

  let rows = await sheet.getRows();

  rows.forEach((row) => {
    if (row.empresa === empresa) {
      console.log(row.empresa);
      console.log(row.email);
    }
  });
};

getRow("youfy");
