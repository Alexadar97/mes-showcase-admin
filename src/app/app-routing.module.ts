import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
// import { NewUploadComponent } from './new-upload/new-upload.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard', component: DashboardComponent,
      children: [
          { path: '', redirectTo: 'main-page', pathMatch: 'full' },
          { path: 'main-page', component: MainPageComponent },
          // { path: 'new-upload', component: NewUploadComponent },
      ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
