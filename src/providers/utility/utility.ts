import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions ,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

export const APP_NAME = "CheckBook";
export const LINK = "https://itunes.apple.com/us/app/check-book-register/id488517738?ls=1&mt=8";
const BASE_URL = 'http://aspiringapps.com/api';

@Injectable()
export class UtilityProvider {

	rowHeader: string;
	colStyle: string;
	bodyHeader: string;

	constructor(public http: Http) {

		this.rowHeader = "font-weight: bold;";
		this.colStyle = "border-bottom: 0.1rem solid #e1e1e1;text-align:left;padding:10px;font-size: 104%;";
		this.bodyHeader = "border: 2px solid #dddddd;border-radius: 5px;text-align: center;margin: 5px;padding: 10px;font-size: 110%;";
	}

	convertToHtml(content , account){
		return new Promise((resolve, reject) => {
			// console.log(content);
			content = content.replace(/ion-row/g, 'tr');
			content = content.replace(/ion-col/g, 'td');
			content = content.replace(/class="row-header row"/g,'style="'+this.rowHeader+'"');
			content = content.replace(/class="col"/g,'style="'+this.colStyle+'"');
			content = content.replace(/col-10=""/g,'colspan="6"');
			content = '<html><head><title>'+account+'</title></head><body><div style="'+this.bodyHeader+'">'+account+'</div><table>'+content+'</table></body></html>';
			content = content.replace(/<!--bindings[\s\S]*?-->/g, '');
			// console.log(content);
			resolve(content);
		});
	}

	convertToCsv(content , account){
		return new Promise((resolve, reject) => {
			// console.log(content);
			content = content.replace(/ion-row/g, 'tr');
			content = content.replace(/ion-col/g, 'td');
			content = content.replace(/class="row-header row"/g,'style="'+this.rowHeader+'"');
			content = content.replace(/class="col"/g,'style="'+this.colStyle+'"');
			content = content.replace(/col-10=""/g,'colspan="6"');
			content = '<table><tr style="'+this.bodyHeader+'"><td>'+account+'</td></tr>'+content+'</table></body></html>';
			content = content.replace(/<!--bindings[\s\S]*?-->/g, '');
			// console.log(content);
			resolve(content);
		});
	}


	createPDF(content){
		// alert(content);
		let url = BASE_URL+"/htmltopdf";
		// alert(url);
		let body = JSON.stringify({ content: content});
    	let headers = new Headers({ 'Content-Type': 'application/json' });
    	let options = new RequestOptions({ headers: headers });

        return this.http.post(url, body, options).map(res => res.json());
    }

}
