import { StudentsService } from './students.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../models/ui-models/student.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: Student[] = [];
  studentSub: Subscription = new Subscription;
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(private studentService: StudentsService) { }

  ngOnInit(): void {
    this.studentSub = this.studentService.getStudents()
      .subscribe(data => {
        this.students = data,
          this.dataSource = new MatTableDataSource<Student>(this.students);
      });
  }

  ngOnDestroy(): void {
    this.studentSub.unsubscribe();
  }
}
