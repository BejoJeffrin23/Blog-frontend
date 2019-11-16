import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    RouterModule.forChild(
      [
        {path:'login',component:LogInComponent},
        {path:'',redirectTo:"login",pathMatch:'full'},
        {path:'signup',component:SignUpComponent}
      ]
    )
  ]
})
export class UserModule { }
