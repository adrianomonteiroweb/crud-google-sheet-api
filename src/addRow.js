const { GoogleSpreadsheet } = require("google-spreadsheet");

const fs = require("fs");

const RES_SHEET_ID = "12cQU4sw3Z76QjKwgZHvzSpWJ63RgpKcaVPOxQCsb7hA";

const newDocument = new GoogleSpreadsheet(RES_SHEET_ID);

const CREDENTIALS = JSON.parse(
  fs.readFileSync("web-scrapying-345223-b42591b674bb.json")
);

const addRow = async (rows) => {
  await newDocument.useServiceAccountAuth({
    client_email: CREDENTIALS.client_email,
    private_key: CREDENTIALS.private_key,
  });

  await newDocument.loadInfo();

  let sheet = newDocument.sheetsByIndex[0];

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    await sheet.addRow(row);
  }
};

let rows = [
  {
    empresa: "sw plast",
    email: "swplast@email.com",
  },
  {
    empresa: "trybe",
    email: "trybe@gmail.com",
  },
];

addRow(rows);
