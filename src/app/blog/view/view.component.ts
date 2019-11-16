import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BlogService } from '../../blog.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public blogId: string;
  public blog: any;
  constructor(private toastr: ToastrService, private service: BlogService, private _route: ActivatedRoute, private appRouter: Router, private location: Location) { }

  ngOnInit() {
    this.blogId = this._route.snapshot.paramMap.get('blogId')

    this.service.getSingleBlog(this.blogId).subscribe(data => {
      console.log(data.data)
      this.blog = data['data']
    })
  }

  public logout = () => {

    this.service.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        Cookie.delete('authToken');
        Cookie.delete('userName');
        Cookie.delete('userId')
        this.appRouter.navigate(['/login']);

      } else {
        this.toastr.error(apiResponse.message)
      } // end condition

    }, (err) => {
      this.toastr.error('Internal Server Error occured')

    });

  }
  // end of log-out function
}

