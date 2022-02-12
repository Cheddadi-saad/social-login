import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Ville, Villes } from '../models/VillesModel';
import { retry, catchError } from 'rxjs/operators';
import { Emplacements } from '../models/EmplacementsModel';
import { ActivitesSportives } from '../models/ActivitesSportivesModel';

/**
 * Injectable
 */
@Injectable({
  providedIn: 'root',
})
export class ActiviteSportiveService {
  

  constructor(private http: HttpClient) {}

  getActivitesSportives(ville: Ville): Observable<ActivitesSportives> {
    return this.http
      .get<ActivitesSportives>(ville._links.activitesSportives.href)
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
