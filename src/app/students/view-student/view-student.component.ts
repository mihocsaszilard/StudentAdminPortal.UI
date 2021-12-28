import { StudentsService } from './../students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Student } from 'src/app/models/ui-models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;
  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    genderId: '',
    profileImgUrl: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      postalAddress: '',
      physicalAddress: ''
    }
  }

  constructor(
    private readonly studentService: StudentsService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          this.studentService.getSingleStudent(this.studentId)
            .subscribe(
              studentData => this.student = studentData
            );
        }
      }
    );
  }
}
