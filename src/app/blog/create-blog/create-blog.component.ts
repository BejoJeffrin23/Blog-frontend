import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { BlogService } from '../../blog.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  constructor(public toastr: ToastrService, private service: BlogService, private _route: ActivatedRoute, private appRouter: Router, private location: Location) { }


  public file: any;
  public title: string;
  public content: string;
  public description: string;
  public imagePreview: any;

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


  }
  Selected(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result.toString();
    }
    reader.readAsDataURL(this.file)
  }


  create() {

    if (!this.title) {

      this.toastr.warning('Enter the title of blog');
    }
    else if (!this.description) {

      this.toastr.warning('Enter blog description');
    }

    else if (!this.content) {

      this.toastr.warning('Enter content of the blog');
    }

    else if (!this.file) {

      this.toastr.warning('Select an image for the blog');
    }
    else {



      let eventData;
      eventData = {

        title: this.title,
        content: this.content,
        description: this.description,
        image: this.file,
        name: this.file.name
      };

      this.service.create(eventData).subscribe((data) => {
        if (data.status == 200) {
          this.toastr.success('Blog created successfully')
          this.appRouter.navigate([`/allblog`])
        }
      });
    }
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




