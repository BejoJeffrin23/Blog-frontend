import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  constructor(
    public http: HttpClient
  ) { }

//for localhost
 private url = 'http://localhost:4001/api/v1/users';

  
  //function to get data from cookies
  public getUserInfoInLocalStorage = () => {
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  //function to save data from cookies
  public setUserInfoInLocalStorage = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  //start of signup function
  public signinFunction(data): Observable<any> {

    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password);

    return this.http.post(`${this.url}/login`, params);
  } // end of signinFunction function.

  //start of sign up function
  public signupFunction(data): Observable<any> {
    const params = new HttpParams()
      .set('fullName', data.fullName)
      .set('mobileNumber', data.mobileNumber)
      .set('email', data.email)
      .set('password', data.password)

    return this.http.post(`${this.url}/signup`, params);

  } // end of signupFunction function.

  //start of log out function
  public logout(): Observable<any> {
    const params = new HttpParams()
      .set('authToken', Cookie.get('authToken'));

    return this.http.post(`${this.url}/logout?authToken=${Cookie.get('authToken')}`, params);

  } // end logout function



//create new event function
  public create(data): Observable<any> {
    console.log(data)
    const Data = new FormData()
      Data.append('title', data.title)
      Data.append('content', data.content)
      Data.append('description',data.description)
      Data.append('userId', Cookie.get('userId'))
      Data.append('userName',Cookie.get('userName'))
      Data.append('productimage', data.image,data.name)
      
      return this.http.post(`${this.url}/create`,Data)

  } // end of signupFunction function.
 


//function to fetch single event
  public getSingleBlog(blogId): any {
    return this.http.get(`${this.url}/get/${blogId}`,blogId)

  }

//function to fetch all events of user
 
  public getevents=():any=>{
    let datas=this.http.get(`${this.url}/all`)
    return datas;
  }
  public delete=(id):any=>{
    console.log(id)
    let params=new HttpParams()
    .set("blogId",id)
    let datas=this.http.post(`${this.url}/delete`,params)
    return datas;
  }
  public getevent=(statusId):any=>{
   let datas=this.http.get(`${this.url}/getevent/${statusId}`);
   return datas;
  }
 
  public edit(id,data):any{
    console.log(data)
    const Data = new FormData()
    if (data.image) {
      Data.append('title',data.title)
      Data.append('content',data.content)
      Data.append('description',data.description)
      Data.append('productimage',data.image,data.name)
    }else if(!data.image){
      Data.append('title', data.title)
      Data.append('content', data.content)
      Data.append('description',data.description)
 }
 
   return this.http.put(`${this.url}/${id}/edit`,Data)
 
 }
 
}
