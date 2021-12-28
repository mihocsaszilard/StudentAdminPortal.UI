import { Gender } from './../models/api-model/gender.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  private baseApiUrl = 'https://localhost:44315';

  constructor(private httpClient: HttpClient) { }

  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders');
  }
}
