import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { map } from 'rxjs/operators';
import { Relationship } from '../students/Relationship';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '@tqp/services/http.service';
import { TokenService } from '@tqp/services/token.service';
import { Person } from '@tqp/models/Person';
import { PersonEntity } from '../PersonEntity';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {

  constructor(private http: HttpClient,
              private httpService: HttpService,
              private tokenService: TokenService) {
  }

  public createRelationship(relationship: Relationship): Observable<Relationship> {
    console.log('createRelationship', relationship);
    const url = environment.apiUrl + '/api/v1/relationship';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<Relationship>(url,
        relationship,
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

  public getRelationshipListByStudentId(studentId: number): Observable<Person[]> {
    const url = environment.apiUrl + '/api/v1/relationship/student/' + studentId;
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.get<Person[]>(url, {
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

  public createPerson_Relationship(relationship: Relationship): Observable<number> {
    const person: PersonEntity = new PersonEntity();
    // Map Relationship fields to Person fields
    person.personSurname = relationship.relationSurname;
    person.personGivenName = relationship.relationGivenName;
    const url = environment.apiUrl + '/api/v1/person/relationship';
    const token = this.tokenService.getToken();
    if (token) {
      return this.http.post<number>(url,
        person,
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