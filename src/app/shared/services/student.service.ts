import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentModel } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  private _students$ = new BehaviorSubject<StudentModel[]>([])

  /*
    getter _students$
  */
  get students$():Observable<StudentModel[]>{
    return this._students$.asObservable();
  }
  /*
    getter studentsArray
  */
  getStudents():StudentModel[]{
    return this._students$.getValue();
  }
  /*
    setter _students$
  */
  setStudents$(students:StudentModel[]):void {
    console.log('svc', students);
    this._students$.next(students)
  }

  /*
    La liste des apprenants
    method : GET
    endpoint : '/customers'
  */
  getStudentsFromApi():void {
    this.http.get(environment.apiStudentUrl+'/customers')
    .pipe(
      map( (apiResponse:any) => 
        apiResponse.map( (student:any) => new StudentModel( student) ) 
    ))
    .subscribe( data => this._students$.next(data) )
  }
  /*
    Poster un nouvel apprenant
    method : POST
    endpoint : '/customers'
  */
    createNewStudentInApi(newStudent:StudentModel):Observable<any> {
      return this.http.post(environment.apiStudentUrl+'/customers', newStudent)
    }
  /*
    Update un apprenant
    method : PUT
    endpoint : '/customers'
  */
  upDateStudentInApi(student:StudentModel):Observable<any> {
    return this.http.put(environment.apiStudentUrl+'/customers/'+student.id, student);
  }
  /*
    Delete un apprenant
    method : DELETE
    endpoint : '/customers'
  */
  deleteStudentInApi(studentId:string):Observable<any> {
    return this.http.delete(environment.apiStudentUrl+'/customers/'+studentId);
  }




}
