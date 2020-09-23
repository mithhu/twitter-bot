const { GoogleSpreadsheet } = require("google-spreadsheet");
require("dotenv").config();

module.exports = class Sheet {
  constructor() {
    // spreadsheet key is the long id in the sheets URL
    this.doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_QUOTE_KEY);
  }

  async load() {
    await this.doc.useServiceAccountAuth(require("./credentials.json"));
    await this.doc.loadInfo(); // loads document properties and worksheets}`
  }

  async addRows(rows) {
    const sheet = this.doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    await sheet.addRows(rows);
  }

  async getRows() {
    const sheet = this.doc.sheetsByIndex[0];
    return await sheet.getRows();
  }
};
