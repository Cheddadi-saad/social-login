import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppSettings } from '../constantes/constantes.commun';
import { ReservationElement } from '../models/ReservationsProjection';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  reserverSeance(dataForm: any): Observable<ReservationElement>{
    return this.http.post<ReservationElement>(AppSettings.API_ENDPOINT+"/reserver",dataForm);
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
