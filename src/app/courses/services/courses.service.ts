import { Injectable, Inject, inject } from '@angular/core';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';
  private httpCliente = inject(HttpClient);

  list() {
    return this.httpCliente.get<Course[]>(this.API)
    .pipe(
      first(),
      delay(700),
      tap(courses => console.log(courses)));
  }

  save(course: Partial<Course>) {
    return this.httpCliente.post<Course>(this.API, course).pipe(first());
  }
}
