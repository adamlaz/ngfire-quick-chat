import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './+main/main.component';
import { SigninComponent } from './+signin/signin.component';
import { MypostsComponent } from './+myposts/myposts.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

{ path: '', pathMatch: 'full', component: MainComponent, canActivate: [AuthGuard] },
{ path: 'signin', component: SigninComponent },
{ path: 'myposts', component: MypostsComponent, canActivate: [AuthGuard] },
{ path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
