import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { OtpvalidateComponent } from './otpvalidate/otpvalidate.component';


const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'otp', component: OtpvalidateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
