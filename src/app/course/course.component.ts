import { Component, OnInit } from '@angular/core';
import { CourseService } from '../shared/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  courses:any
  constructor(private courseService:CourseService) { }

  ngOnInit(): void {
    this.courseService
    .getCourses()
    .subscribe((response:any) => (this.courses = response));
  }

}
