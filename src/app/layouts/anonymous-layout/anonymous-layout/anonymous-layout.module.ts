import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnonymousLayoutRoutes } from './anonymous-layout.routing';
import { LoginComponent } from '../../../login/login.component';
import { RegistrationComponent } from '../../../registration/registration.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AnonymousLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ]
})

export class AnonymousLayoutModule {}
