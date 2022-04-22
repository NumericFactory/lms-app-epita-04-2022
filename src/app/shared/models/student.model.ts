export class StudentModel {
    id:string;
    first:string;
    last:string;
    city:string;
    email:string;
    mobile:string;
    constructor(student:any) {
      console.log(student)
      this.id = student.id;
      this.last = student.customer.last;
      this.first = student.customer.first;
      this.city = student.customer.city;
      this.email = student.customer.email;
      this.mobile = student.customer.mobile;
    }
}