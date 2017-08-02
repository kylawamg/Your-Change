import { Routes } from '@angular/router';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent} from './home/home.component';
import { UserComponent} from './user/user.component';
import { ProjectsComponent} from './projects/projects.component';
import { ProjectCreateComponent} from './project-create/project-create.component';
import { ShowAllProjectsComponent} from './show-all-projects/show-all-projects.component';
import { ProjectDetailComponent} from './project-detail/project-detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'user', component: UserComponent,
        children: [
          { path: 'login', component: LoginFormComponent },
         { path: 'signup', component: SignupFormComponent }
      //    { path: ':id/edit', component: EditComponent }
        ]
    },
    { path: 'projects', component: ProjectsComponent,
        children: [
          { path: 'new', component: ProjectCreateComponent },
          { path: 'all', component: ShowAllProjectsComponent },
          { path: 'detail/:id', component: ProjectDetailComponent }
      //    { path: ':id/edit', component: EditComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
