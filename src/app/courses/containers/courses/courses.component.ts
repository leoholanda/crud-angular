import { CoursesService } from '../../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../model/course';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private courseService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
      this.refresh();
    }

  ngOnInit(): void {

  }

  refresh() {
    this.courses$ = this.courseService.list()
      .pipe(
        catchError(error => {
          this.openFailureSnackBar('Erro ao carregar cursos.')
          return of([])
        })
      );
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course._id], {relativeTo: this.route});
  }

  onDelete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result) {
        this.courseService.remove(course._id)
        .subscribe({
          next: () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso', '', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['success-snackbar']
            });
          },
          error: () => {
            this.openFailureSnackBar('Erro ao tentar remover curso')
          }
        });
      }
    });
  }

  openFailureSnackBar(errorMessage: string) {
    this.snackBar.open(errorMessage, '', {
      duration: 8000,
      verticalPosition: 'top',
      panelClass: ['app-notification-error']
    });
  }

  openSuccessSnackBar(errorMessage: string) {
    this.snackBar.open(errorMessage, '', {
      duration: 8000,
      verticalPosition: 'top',
      panelClass: ['app-notification-success']
    });
  }

}
