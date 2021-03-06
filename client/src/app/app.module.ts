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
import { RelationsService } from './services/relations.service';
import { CommentService } from './services/comment.service';
import { MessageService } from './services/messages.service';
import { routes } from './app.routing';
import { CommentComponent } from './comment/comment.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectsComponent } from './projects/projects.component';
import { ShowAllProjectsComponent } from './show-all-projects/show-all-projects.component';
import { ShowProjectByTypeComponent } from './show-project-by-type/show-project-by-type.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShowProjectsByUserComponent } from './show-projects-by-user/show-projects-by-user.component';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ShowOngsComponent } from './show-ongs/show-ongs.component';
import { FileUploadModule } from "ng2-file-upload";
import { AgmCoreModule } from '@agm/core';
import {} from '@types/googlemaps';
import { ReactiveFormsModule } from '@angular/forms';
import { SendMessageComponent } from './send-message/send-message.component';
import { MessagesComponent } from './messages/messages.component';
import { ShowMessagesByuserComponent } from './show-messages-byuser/show-messages-byuser.component';
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
    UserProfileComponent,
    ShowProjectsByUserComponent,
    EditUserProfileComponent,
    EditProjectComponent,
    ShowOngsComponent,
    SendMessageComponent,
    MessagesComponent,
    ShowMessagesByuserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAguIL3iSMULstjCCoXrKnz1xgwcsbB8so',
      libraries: ["places"]
    })
  ],
  providers: [SessionService, LoggedinService,ProjectService,
    CommentService,MessageService,RelationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
