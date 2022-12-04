export default class ExportService {
    constructor() {

    }

    exportToCSV(list, fileName) {
        const csvList = this._convertToCSV(list);
        this._downloadCSV(csvList, fileName);
    }

    _convertToCSV(list) {
        const array = [Object.keys(list[0])].concat(list);
        return array.map(item => Object.values(item).toString()).join('\n');
    }

   _downloadCSV(csv, fileName) {
       // CSV file
       const csvFile = new Blob([csv], { type: "text/csv;charset=utf-8;" });
       // Download link
       const downloadLink = document.createElement("a");
       // File name
       downloadLink.download = fileName;
       // We have to create a link to the file
       downloadLink.href = window.URL.createObjectURL(csvFile);
       // Make sure that the link is not displayed
       downloadLink.style.display = "none";
       // Add the link to the DOM
       document.body.appendChild(downloadLink);
       // Lanzamos
       downloadLink.click();
   }

}