import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Student } from '../models/api-model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseApiUrl = 'https://localhost:44315';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseApiUrl}/students`);
  }

  getSingleStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseApiUrl}/students/${studentId}`);
  }
}
