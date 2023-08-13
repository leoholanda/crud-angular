import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  displayedColumns = ['_id', 'name', 'category'];

  constructor(
    private courseService: CoursesService,
    private dialog: MatDialog
    ) {
      this.courses$ = this.courseService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar cursos.')
          return of([])
        })
      );
    }

  ngOnInit(): void {

  }

  onError(errorMessage: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }

}
