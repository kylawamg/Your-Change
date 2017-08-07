import { Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent} from './home/home.component';
import { UserComponent} from './user/user.component';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectCreateComponent} from './project-create/project-create.component';
import { ShowAllProjectsComponent} from './show-all-projects/show-all-projects.component';
import { ProjectDetailComponent} from './project-detail/project-detail.component';
import { ShowProjectByTypeComponent} from './show-project-by-type/show-project-by-type.component';
import { UserProfileComponent} from './user-profile/user-profile.component';
import { ShowProjectsByUserComponent} from './show-projects-by-user/show-projects-by-user.component';
import { EditUserProfileComponent} from './edit-user-profile/edit-user-profile.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ShowOngsComponent } from './show-ongs/show-ongs.component';
import { MessagesComponent } from './messages/messages.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { ShowMessagesByuserComponent } from './show-messages-byuser/show-messages-byuser.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
      { path: 'profile/:id', component: UserProfileComponent },
      { path: 'edit/:id', component: EditUserProfileComponent },
      { path: 'type/:type', component: ShowOngsComponent },
    ]
  },
  {
    path: 'projects', component: ProjectsComponent,
    children: [
      { path: 'new', component: ProjectCreateComponent },
      { path: 'all', component: ShowAllProjectsComponent },
      { path: 'myprojects/:creator', component: ShowProjectsByUserComponent },
      { path: 'detail/:id', component: ProjectDetailComponent },
      { path: 'type/:type', component: ShowProjectByTypeComponent },
      { path: 'edit/:id', component: EditProjectComponent }
    ]
  },
  {path: 'messages', component: MessagesComponent,
    children: [
      { path: 'new', component: SendMessageComponent},
      { path: 'mymessages', component: ShowMessagesByuserComponent}
    ]
  },

  //  { path: 'comments/new', component: CreateCommentComponent },
  { path: '**', redirectTo: '' }
];
