// import { Injectable } from '@angular/core';
// import { Workbook } from 'exceljs';
// import * as fs from 'file-saver';
// import { CadastroSegmentoRVDTO } from 'src/models/CadastroSegmentoRV.dto';

// @Injectable({
//   providedIn: 'root'
// })
// export class ExcelService {

//   constructor() { }

//   generateExcel(title: String, data: CadastroSegmentoRVDTO[], documentName: String){
//     let workbook = new Workbook();
//     let worksheet = workbook.addWorksheet(documentName.toString());
//     // Add new row
//     let titleRow = worksheet.addRow([title]);
//     // Set font, size and style in title row.
//     titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
//     // Blank Row
//     worksheet.addRow([]);
//     //Add row with current date
//     worksheet.addRows(data);
    
//     workbook.xlsx.writeBuffer().then((data) => {
//       let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       fs.saveAs(blob, 'CarData.xlsx');
// });

 
//   }
 
// }
