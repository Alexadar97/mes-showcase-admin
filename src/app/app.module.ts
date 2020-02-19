import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { DatatransferService } from './datatransfer.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
// import { NewUploadComponent } from './new-upload/new-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainPageComponent,
    LoginComponent,
    NavbarComponent,
    // NewUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    DragDropModule,
    RouterModule,
    PdfViewerModule,
    HttpClientModule
    
  ],
  providers: [DatatransferService],
  bootstrap: [AppComponent,]
})
export class AppModule { }
