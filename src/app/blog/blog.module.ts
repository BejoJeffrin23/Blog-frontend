import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { AllBlogComponent } from './all-blog/all-blog.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import{NgxEditorModule } from 'ngx-editor';
import { ViewComponent } from './view/view.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
  declarations: [CreateBlogComponent, EditBlogComponent, AllBlogComponent, ViewComponent],
  imports: [
    CommonModule,
    NgxEditorModule,
   NgxPaginationModule,

    FormsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    RouterModule.forChild(
      [
        {path:'create',component:CreateBlogComponent},
        {path:':blogId/edit',component:EditBlogComponent},
        {path:':view/:blogId',component:ViewComponent},
        {path:'allblog',component:AllBlogComponent}

      ]
    )  ]
})
export class BlogModule { }
