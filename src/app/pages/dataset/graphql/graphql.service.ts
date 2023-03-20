import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GraphqlService {

  constructor(private http: HttpClient) { }

  checkEndpoint(endpointUrl: string): Observable<boolean> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    const query = `
      query {
        __schema {
          types {
            name
          }
        }
      }
    `;

    return this.http.post(endpointUrl, { query }, { headers })
      .pipe(map((response: any) => {
        return response && response.data && response.data.__schema;
      }), catchError((err: HttpErrorResponse) => {
        console.error(err);
        return of(false);
      }))
  }
}