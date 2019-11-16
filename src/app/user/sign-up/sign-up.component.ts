import { Component, OnInit } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { Router } from '@angular/router';
import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],

})
export class SignUpComponent implements OnInit {



  public firstName: string;
  public lastName: string
  public email: string;
  public password: any;
  public mobileNumber: number;

  constructor(public router: Router,
    public toastr: ToastrService,
    public service: BlogService) { }

  ngOnInit() {
  }

  // function to move to log-in page
  public goToLogin: any = () => {

    this.router.navigate(['/login']);

  }
  //end of move to log-in function



  // Sign-up function

  public signupFunction(): any {

    if (!this.firstName) {

      this.toastr.warning('Enter your first name');
    }
    else if (!this.mobileNumber) {

      this.toastr.warning('Enter the mobile number');
    }

    else if (!this.email) {

      this.toastr.warning('Enter your email');
    }

    else if (!this.password) {

      this.toastr.warning('Enter the password');
    }
    else {



      let data = {
        fullName: this.firstName + " " + this.lastName,
        email: this.email,
        password: this.password,
        mobileNumber: this.mobileNumber,
      }


      this.service.signupFunction(data).subscribe(
        (apiResponse) => {

          console.log(apiResponse)

          if (apiResponse.status === 200) {

            Cookie.set('authToken', apiResponse.data.authToken);

            Cookie.set('userId', apiResponse.data.userDetails.userId);

            Cookie.set('userName', apiResponse.data.userDetails.fullName);

            this.service.setUserInfoInLocalStorage(apiResponse.data.userDetails)

            this.router.navigate([`/allblog`])

            this.toastr.success('Signup successful');
          }

          else {
            this.toastr.error(apiResponse.message);

          }


        }, (err) => {

          this.toastr.error('some error occured');


        });
    }



  }

  // end of Sign-up function


}
