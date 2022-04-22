import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {}
  private _apiCourseUrl = environment.apiCourseUrl;

  getCourses() {
    return this.http.get(this._apiCourseUrl+ '/courses')
    .pipe(map((response:any) => response.courses.filter( (course:any) => course.online == true )))
  }

  getCourse(id:number) {
    return this.http.get(
      this._apiCourseUrl+ '/courses/' + id + '?withlessons=true'
    );
  }

  getLessonsFromModule(moduleId: number) {
    return this.http.get(
      this._apiCourseUrl+ '/modules/' + moduleId
    );
  }
}