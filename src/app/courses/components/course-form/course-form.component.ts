import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  action: string = "";

  form!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService) {
  }

  ngOnInit(): void {
    this.openFormEdit();

    this.form.value._id ? this.action = 'Editar' : this.action = 'Cadastrar';
  }

  openFormEdit() {
    const course: Course = this.route.snapshot.data['course']
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      category: [course.category, [Validators.required]],
      lessons: this.formBuilder.array(this.retrieveLessons(course), Validators.required)
    });
  }

  private createLesson(lesson: Lesson = {id: '', name: '', youtubeUrl: ''}) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, [Validators.required, Validators.minLength(5), Validators.max(100)]],
      youtubeUrl: [lesson.youtubeUrl, [Validators.required, Validators.maxLength(10)]]
    });
  }

  private retrieveLessons(course: Course) {
    const lessons = [];
    if(course?.lessons) {
      course.lessons.forEach(lesson => lessons.push(this.createLesson(lesson)));
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }

  addLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.push(this.createLesson());
  }

  removeLesson(index: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;
    lessons.removeAt(index);
  }

  onSubmit() {
    if(this.form.valid) {
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
      
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }
    
  }

  onCancel() {
    this.location.back();
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

