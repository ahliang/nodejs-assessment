import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiHelperService {

  constructor(
    public http: HttpClient,
  ) { }

  async get(url: string, params?, headers?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(url, params).subscribe(data => {
        return resolve(data);
      },
        err => {
          console.log('GET: Error: ', err);
          return reject(err);
        });
    });
  }

  async post(url: string, body?, headers?): Promise<any> {
    console.log(url, body, headers);
    return new Promise((resolve, reject) => {
      this.http.post(url, body, headers).subscribe(data => {
        resolve(data);
      },
        err => {
          console.log('POST: Error: ', err);
          return reject(err);
        });
    });
  }

  async put(url: string, body?, headers?): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(url, body, headers).subscribe(data => {
        return resolve(data);
      },
        err => {
          console.log('PUT: Error: ', err);
          return reject(err);
        });
    });
  }

  async delete(url: string, body?) {
    return new Promise((resolve, reject) => {
      const options = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body
      };
      console.log('delete options >> ', options);
      this.http.delete(url, options).subscribe(data => {
        return resolve(data);
      },
        err => {
          console.log('DELETE: Error: ', err);
          return reject(err);
        });
    });
  }

  toQuery(obj: any): string {
    return Object.keys(obj)
      .map(k => `${k}=${encodeURIComponent(obj[k])}`)
      .join('&');
  }
}
