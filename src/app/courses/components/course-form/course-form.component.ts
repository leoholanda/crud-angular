import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    category: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.openFormEdit();
  }

  openFormEdit() {
    const course: Course = this.route.snapshot.data['course']

    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    })
  }

  onSubmit() {
    this.service.save(this.form.value)
    .subscribe({
      next: (res: any) => {
        this.openSuccessSnackBar('Curso salvo com sucesso!');
        console.log(res);
      },
      error: (err: any) => {
        this.openFailureSnackBar('Erro ao salvar curso');
        console.log(err);
      }
    });
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if(field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`
    }

    if(field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 5;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`
    }

    return 'Campo inválido';
  }

  openFailureSnackBar(errorMessage: string) {
    this.snackBar.open(errorMessage, '', {
      duration: 8000,
      verticalPosition: 'bottom',
      panelClass: ['app-notification-error']
    });
  }

  openSuccessSnackBar(errorMessage: string) {
    this.snackBar.open(errorMessage, '', {
      duration: 8000,
      verticalPosition: 'bottom',
      panelClass: ['app-notification-success']
    });
  }

}

