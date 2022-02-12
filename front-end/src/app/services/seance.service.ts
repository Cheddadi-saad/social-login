import { ReservationsProjection } from './../models/ReservationsProjection';
import { SeanceElement } from './../models/SeanceProjection';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Emplacement } from '../models/EmplacementsModel';
import { SeancesProjections } from '../models/SeanceProjection';


@Injectable({
  providedIn: 'root',
})
export class SeanceService {
  constructor(private http: HttpClient) {}

  getSeancesProjection(emplacement: Emplacement): Observable<SeancesProjections> {
    let url = emplacement._links.seances.href.replace('{?projection}', '')+ "?projection=se1";
    return this.http.get<SeancesProjections>(url).pipe(retry(1), catchError(this.processError));
  }

  getReservationPlaces(seanceElement:SeanceElement): Observable<ReservationsProjection>{
    let url = seanceElement._links.reservations.href.replace('{?projection}', '')+ "?projection=res1";
    return this.http.get<ReservationsProjection>(url).pipe(retry(1), catchError(this.processError));
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
