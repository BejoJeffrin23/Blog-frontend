import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../blog.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-blog',
  templateUrl: './all-blog.component.html',
  styleUrls: ['./all-blog.component.css']
})
export class AllBlogComponent implements OnInit {
  public details: []
  public userName: string;
  public p: Number = 1;
  public count: Number = 5;
  constructor(public toastr: ToastrService, private service: BlogService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.fetch()
    this.userName = Cookie.get('userName')
  }

  fetch = () => {
    this.service.getevents().subscribe((data) => {
      this.details = data["data"]
      console.log(this.details)
    })
  }

  create = () => {
    this.router.navigate(['/create'])
  }
  edit = (id) => {
    this.router.navigate([`${id}/edit`])
  }
  read = (id) => {
    this.router.navigate([`/view/${id}`])
  }

  delete = (id) => {
    console.log(id)
    this.service.delete(id).subscribe(data => {
      this.fetch()
    })
  }

  public logout = () => {

    this.service.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        Cookie.delete('authToken');
        Cookie.delete('userName');
        Cookie.delete('userId')
        this.router.navigate(['/login']);

      } else {
        this.toastr.error(apiResponse.message)
      } // end condition

    }, (err) => {
      this.toastr.error('Internal Server Error occured')

    });

  }
  // end of log-out function

}
