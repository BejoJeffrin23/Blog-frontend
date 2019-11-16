import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public email: String;
  public password: any;
  public signuploader: boolean;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public authToken: String = Cookie.get('authToken')

  constructor(public appService: BlogService,
    public router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }


  // Move to Sign-up page function
  public goToSignUp: any = () => {

    this.router.navigate(['/signup']);

  } // end goToSignUp

  // Log-in function
  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email')

    } else if (!this.password) {

      this.toastr.warning('enter password')

    } else {
      this.signuploader = false;
      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse)
          this.toastr.success('Login success')
          if (apiResponse.status === 200) {


            Cookie.set('authToken', apiResponse.data.authToken);

            Cookie.set('userId', apiResponse.data.userDetails.userId);

            Cookie.set('userName', apiResponse.data.userDetails.fullName);

            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)

            this.router.navigate([`/allblog`])


          } else {

            this.toastr.error(apiResponse.message)


          }

        }, (err) => {
          this.toastr.warning('some error occured')

        });

    } // end condition

  } // end Log-inFunction

}
