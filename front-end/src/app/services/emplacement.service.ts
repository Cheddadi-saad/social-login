import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ActiviteSportive } from '../models/ActivitesSportivesModel';
import { Emplacements } from '../models/EmplacementsModel';

@Injectable({
  providedIn: 'root',
})
export class EmplacementService {
  constructor(private http: HttpClient) {}

  getEmplacements(activiteSportive: ActiviteSportive): Observable<Emplacements> {
    return this.http
      .get<Emplacements>(activiteSportive._links.emplacements.href)
      .pipe(retry(1), catchError(this.processError));
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
