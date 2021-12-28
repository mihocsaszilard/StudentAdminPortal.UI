import { StudentsService } from './students.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Student } from '../models/ui-models/student.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: Student[] = [];
  studentSub: Subscription = new Subscription;
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', 'edit'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(private studentService: StudentsService) { }

  ngOnInit(): void {
    this.studentSub = this.studentService.getStudents()
      .subscribe(data => {
        this.students = data;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      });
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.studentSub.unsubscribe();
  }
}
