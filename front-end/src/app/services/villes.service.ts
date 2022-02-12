import { AppSettings } from './../constantes/constantes.commun';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Villes } from '../models/VillesModel';
import { retry, catchError } from 'rxjs/operators';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class VillesService {
  

  /**
   * Creates an instance of villes service.
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Gets villes
   * @returns villes
   */
  getVilles(): Observable<Villes> {
    return this.http.get<Villes>(AppSettings.API_ENDPOINT + '/villes').pipe(retry(1), catchError(this.processError));
  }

  /**
   * Process error
   * @param err
   * @returns
   */
  processError(err: { error: { message: string }; status: any; message: any }) {
    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    return throwError(message);
  }
}
