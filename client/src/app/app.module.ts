import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { UserComponent } from './user/user.component';
import { SessionService } from "./services/session.service";
import { LoggedinService } from './services/loggedin.service';
import { ProjectService } from './services/project.service';
import { routes } from './app.routing';
import { CommentComponent } from './comment/comment.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectsComponent } from './projects/projects.component';
import { ShowAllProjectsComponent } from './show-all-projects/show-all-projects.component';
import { ShowProjectByTypeComponent } from './show-project-by-type/show-project-by-type.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    LoginFormComponent,
    HomeComponent,
    UserComponent,
    CommentComponent,
    ProjectDetailComponent,
    ProjectCreateComponent,
    ProjectsComponent,
    ShowAllProjectsComponent,
    ShowProjectByTypeComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),

  ],
  providers: [SessionService, LoggedinService,ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
