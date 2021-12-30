import { Gender } from './../../models/api-model/gender.model';
import { GenderServiceService } from './../../services/gender-service.service';
import { StudentsService } from './../students.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Student } from 'src/app/models/ui-models/student.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit, OnDestroy {

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
  isNewStudent = false;
  studentSub: Subscription | undefined;
  genderSub: Subscription | undefined;

  constructor(
    private readonly studentService: StudentsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly genderService: GenderServiceService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');

        if (this.studentId) {
          // If the route contains 'add' -> new student
          if (this.studentId.toLowerCase() === 'new'.toLowerCase()) {
            this.isNewStudent = true;

          } else {
            // otherwise -> existing student
            this.isNewStudent = false;

            this.studentSub = this.studentService.getSingleStudent(this.studentId)
              .subscribe(
                studentData => this.student = studentData
              );
          }

          this.genderSub = this.genderService.getGenderList()
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
      .subscribe(() => this.snackbar
        .open('Student updated successfully!', undefined, {
          duration: 3000,
        })
      );
    setTimeout(() => {
      this.router.navigateByUrl('/students');
    }, 2000);
  }

  onDeleteStudent(): void {
    this.studentService.deleteStudent(this.student.id)
      .subscribe(() => this.snackbar
        .open('Student removed successfully!', undefined, {
          duration: 2000,
        })
      );
    setTimeout(() => {
      this.router.navigateByUrl('/students');
    }, 2000);
  }

  onCreateStudent(): void {
    this.studentService.createStudent(this.student)
      .subscribe((createdStudent) => this.navigateToStudent(createdStudent)
      )
  }

  navigateToStudent(createdStudent: Student) {
    this.snackbar.open('Student added successfully!', undefined, {
      duration: 2000,
    });
    setTimeout(() => {
      this.router.navigateByUrl(`/students/${createdStudent.id}`);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
    this.genderSub?.unsubscribe();
  }
}
