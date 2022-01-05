import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Gender } from './../models/api-model/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getGenderList(): Observable<Gender[]> {
    return this.httpClient.get<Gender[]>(this.baseApiUrl + '/genders');
  }
}
