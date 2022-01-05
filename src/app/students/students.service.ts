import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { CreateStudentRequest } from './../models/api-model/create-student-request.model';
import { UpdateStudentRequest } from './../models/api-model/update-student-request.model';
import { Student } from '../models/api-model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseApiUrl}/students`);
  }

  getSingleStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseApiUrl}/students/${studentId}`);
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    }
    return this.httpClient.put<Student>(`${this.baseApiUrl}/students/${studentId}`, updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(`${this.baseApiUrl}/students/${studentId}`);
  }

  createStudent(studentRequest: Student): Observable<Student> {
    const createStudentRequest: CreateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    return this.httpClient.post<Student>(`${this.baseApiUrl}/students/new`, createStudentRequest);
  }

  uploadStudentImg(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append("profileImg", file);

    return this.httpClient.post(`${this.baseApiUrl}/students/${studentId}/upload-img`,
      formData, { responseType: 'text' }
    );
  }

  getImgPath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
