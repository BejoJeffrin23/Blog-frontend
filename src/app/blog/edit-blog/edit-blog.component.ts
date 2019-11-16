import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BlogService } from '../../blog.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {


  constructor(private toastr: ToastrService, private service: BlogService, private _route: ActivatedRoute, private appRouter: Router, private location: Location) { }


  public file: any;
  public blog: any;
  public blogId: string;
  public imagePreview: string;
  editorConfig = {
    "editable": true,
    "spellcheck": true,
    "height": "25vmin",
    "minHeight": "0",
    "width": "auto",
    "minWidth": "0",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "imageEndPoint": this.file,
    "toolbar": [
      ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
      ["fontName", "fontSize", "color"],
      ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
      ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
      ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"]
    ]
  }


  ngOnInit() {
    this.blogId = this._route.snapshot.paramMap.get('blogId')
    console.log(this.blogId)

    this.service.getSingleBlog(this.blogId).subscribe(data => {
      console.log(data.data)
      this.blog = data['data']

    })
  }

  Selected(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    }
    reader.readAsDataURL(this.file)
  }

  edit() {

    console.log(this.blog)
    if (this.file) {
      this.blog.image = this.file;
      this.blog.name = this.file.name
    }

    this.service.edit(this.blogId, this.blog).subscribe((data) => {
      if (data.status == 200) {
        this.toastr.success('Blog edited successfully')
        this.appRouter.navigate([`/allblog`])
      }
    });
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







