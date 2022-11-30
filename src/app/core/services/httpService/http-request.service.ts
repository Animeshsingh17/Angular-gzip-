import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SnackBarService } from '../snackBarService/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  headers: HttpHeaders;

  options: any;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService, private notification: SnackBarService) { }

  Get(apiEndPoint: string): Promise<any> {
    const that = this;
    this.getHeader();
    return that.http
      .get(apiEndPoint, that.options)
      .toPromise()
      .then(res => {
        return that.extractData(res)
      })
      .catch(error => { that.handleError(error) });
  }
  Post(apiEndPoint: string, param: any): Promise<any> {
    const that = this;
    this.getHeader();

    let body = param;
    return that.http
      .post(apiEndPoint, body, that.options)
      .toPromise()
      .then(res => {
        return that.extractData(res);
      })
      .catch(error => {
        that.handleError(error);
        return error;
      });
  }

  Put(apiEndPoint: string, param: any): Promise<any> {
    const that = this;
    this.getHeader();
    let body = param;
    return that.http
      .put(apiEndPoint, body, that.options)
      .toPromise()
      .then(res => {
        return that.extractData(res);
      })
      .catch(error => {
        that.handleError(error);
      });
  }

  Delete(apiEndPoint: string, param: any): Promise<any> {
    const that = this;
    this.getHeader();
    return that.http
      .delete(apiEndPoint, that.options)
      .toPromise()
      .then(res => {
        return that.extractData(res);
      })
      .catch(error => {
        that.handleError(error);
      });
  }

  Patch(apiEndPoint: string, param: any): Promise<any> {
    const that = this;
    this.getHeader();
    let body = param;
    return that.http
      .patch(apiEndPoint, body, that.options)
      .toPromise()
      .then(res => {
        return that.extractData(res);
      })
      .catch(error => {
        that.handleError(error);
      });
  }

  private extractData(res: any) {
    let body = res;
    return body || {};
  }

  private getHeader() {
    var token = this.authenticationService.currentUserToken
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    this.options = {
      headers: this.headers,
    };
  }

  private async handleError(error: HttpErrorResponse) {
    this.notification.open("" + error, 'error', 1000);
  }
  PostPromise(apiEndPoint: string, param: any): Promise<any> {
    const that = this;
    this.getHeader();

    let body = param;
    var promise = new Promise((resolve, reject) => {
      return that.http
        .post(apiEndPoint, body, that.options)
        .toPromise()
        .then(res => {
          resolve(that.extractData(res));

        })
        .catch(error => {
          that.handleError(error);
          return error;
        });
    });
    return promise
  }
  GetPromise(apiEndPoint: string): Promise<any> {
    const that = this;
    this.getHeader();


    var promise = new Promise((resolve, reject) => {
      return that.http
        .get(apiEndPoint, that.options)
        .toPromise()
        .then(res => {
          resolve(that.extractData(res));

        })
        .catch(error => {
          that.handleError(error);
          return error;
        });
    });
    return promise
  }
}
