
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';


import { Student } from './../../models/ui-models/student.model';
import { Gender } from './../../models/api-model/gender.model';
import { GenderServiceService } from './../../services/gender-service.service';
import { StudentsService } from './../students.service';
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
  imgPath = '';
  errorMsg = '';

  @ViewChild('studentDetailsForm') studentDetailsForm?: NgForm;

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
            this.setImg();
          } else {
            // otherwise -> existing student
            this.isNewStudent = false;
            this.studentSub = this.studentService.getSingleStudent(this.studentId)
              .subscribe(
                studentData => this.student = studentData
              );
            this.setImg();
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
    if (this.studentDetailsForm?.form.valid) {
      // Call Student Service to update
      this.studentService.updateStudent(this.student.id, this.student)
        .subscribe({
          next: () => this.snackbar
            .open('Student updated successfully!', undefined, {
              duration: 3000,
            }),
          error: (e) => {
            console.log(e),
              this.errorMsg = e.error.errors.Mobile[0];
          }
        });
      setTimeout(() => {
        this.router.navigateByUrl(`/students/${this.student.id}`);
      }, 2000);
    }
  }

  onDeleteStudent(): void {
    this.studentService.deleteStudent(this.student.id)
      .subscribe({
        next: () => this.snackbar
          .open('Student removed successfully!', undefined, {
            duration: 2000,
          }),
        error: (e) => console.log(e)
      });
    setTimeout(() => {
      this.router.navigateByUrl('/students');
    }, 2000);
  }

  onCreateStudent(): void {

    if (this.studentDetailsForm?.form.valid) {
      // Submit form

      this.studentService.createStudent(this.student)
        .subscribe({
          next: createdStudent => {
            this.snackbar.open('Student added successfully!', undefined, {
              duration: 2000,
            });
            setTimeout(() => {
              this.router.navigateByUrl(`/students/${createdStudent.id}`);
            }, 2000);
          },
          error: e => console.log(e)
        });
    }
  }

  uploadImg(event: any): void {
    if (this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadStudentImg(this.student.id, file)
        .subscribe({
          next: uploadedImgUrl => {
            // slice -> because the path contains the full project directory
            this.student.profileImgUrl = uploadedImgUrl
              .slice(119, uploadedImgUrl.length);
            console.log(this.student.profileImgUrl);
            this.setImg();
            this.snackbar.open('Profile Image has been updated!', undefined, {
              duration: 2000
            })
          },
          error: e => console.log(e)
        });
    }
  }

  setImg() {
    if (this.student.profileImgUrl) {
      // load image by url
      this.imgPath = this.studentService.getImgPath(this.student.profileImgUrl);
    } else {
      // display default img
      this.imgPath = "assets/images/defaultAvatar.png";
    }
  }

  ngOnDestroy(): void {
    this.studentSub?.unsubscribe();
    this.genderSub?.unsubscribe();
  }
}
