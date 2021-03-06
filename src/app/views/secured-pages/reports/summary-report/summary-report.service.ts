import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Observable } from 'rxjs';
import { Sponsor } from '../../people/sponsors/Sponsor';
import { Student } from '../../people/students/Student';
import { SummaryReportResult } from './SummaryReportResult';

@Injectable({
  providedIn: 'root'
})
export class SummaryReportService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public getActiveStudents_Count(): Observable<number> {
    const url = environment.apiUrl + '/api/v1/summary-report/active-students/count';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<number>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

  public getActiveStudents_Results(): Observable<SummaryReportResult[]> {
    const url = environment.apiUrl + '/api/v1/summary-report/active-students/results';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<SummaryReportResult[]>(url,
        {
          headers: this.httpService.setHeadersWithToken(),
          observe: 'response',
          params: {}
        })
        .pipe(
          map(res => {
            return res.body;
          })
        );
    } else {
      console.error('No token was present.');
      return null;
    }
  }

}
