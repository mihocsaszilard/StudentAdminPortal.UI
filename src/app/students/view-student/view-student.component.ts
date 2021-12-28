import { Gender } from './../../models/api-model/gender.model';
import { GenderServiceService } from './../../services/gender-service.service';
import { StudentsService } from './../students.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { Student } from 'src/app/models/ui-models/student.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  genderList: Gender[] = [];

  constructor(
    private readonly studentService: StudentsService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderServiceService,
    private snackbar: MatSnackBar
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

          this.genderService.getGenderList()
            .subscribe(
              genderData => this.genderList = genderData
            );
        }
      }
    );
  }

  onUpdateStudent(): void {
    // Call Student Service to update
    this.studentService.updateStudent(this.student.id, this.student)
      .subscribe(updatedData => this.snackbar
        .open('Student updated successfully', undefined, {
          duration: 3000,
        })
      );
  }
}
