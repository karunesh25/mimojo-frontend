import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AnonymousLayoutComponent } from './layouts/anonymous-layout/anonymous-layout/anonymous-layout.component';

const routes: Routes =[
//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   }, 
//   { path: '', component: AdminLayoutComponent,
//   children: [
//       {
//     path: '',
//     loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
// }] },

//   {
//     path: '',
//     redirectTo: 'login',
//     pathMatch: 'full',
//   }, 
//   { 
//   path: '', component: AnonymousLayoutComponent,
//   children: [
//       {
//     path: '',
//     loadChildren: () => import('./layouts/anonymous-layout/anonymous-layout/anonymous-layout.module').then(x=>x.AnonymousLayoutModule)
// }] },

// { path: 'login', component: AnonymousLayoutComponent,
// children: [
//     {
//   path: 'login',
//   loadChildren: () => import('./layouts/anonymous-layout/anonymous-layout/anonymous-layout.module').then(x=>x.AnonymousLayoutModule)
// }] },
  // { path: 'register', component: RegistrationComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(x=>x.AdminLayoutModule)
  }]},
  {
    path: '',
    component: AnonymousLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./layouts/anonymous-layout/anonymous-layout/anonymous-layout.module').then(m => m.AnonymousLayoutModule)
    }]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
