import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'tutorials', pathMatch: 'full' },
  {
    path: 'tutorials',
    component: TutorialsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tutorials/:id',
    component: TutorialDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add', component: AddTutorialComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
