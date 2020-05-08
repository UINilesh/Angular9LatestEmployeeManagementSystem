import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class EmpService {
  employees = [];
  constructor(private _http: HttpClient) {}
  checkMe: any;

  getEmployees() {
    //return this._http.get("http://employeeerp.fusionbox.co.in/api/select.php/")
    return this._http
      .get('http://employeeerp.fusionbox.co.in/api/select.php/')

      .map((res) => {
        this.checkMe = res;

        if (this.checkMe._body !== '0') {
          //  return res.json()
          return res;
        }
      });
  }

  addEmployee(info) {
    return this._http
      .post('http://employeeerp.fusionbox.co.in/api/insert.php/', info)
      .map(() => '');
  }

  getEmployee(id) {
    return this._http
      .post('http://employeeerp.fusionbox.co.in/api/selectone.php/', { id: id })
      .map((res) => res);
  }

  deleteEmployee(id) {
    return this._http
      .post('http://employeeerp.fusionbox.co.in/api/delete.php/', { id: id })
      .map(() => this.getEmployees());
  }

  updateEmployee(info) {
    return this._http
      .post('http://employeeerp.fusionbox.co.in/api/update.php/', info)
      .map(() => '');
  }

  // download employee data 
  downloadFile(data, filename='data') {
    let csvData = this.ConvertToCSV(data, ['name','position', 'dateofjoining', 'department', 'salary']);
    console.log(csvData)
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

ConvertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = 'S.No,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];

             line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }

}
