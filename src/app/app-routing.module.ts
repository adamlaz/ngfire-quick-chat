import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './+main/main.component';
import { SigninComponent } from './+signin/signin.component';
import { MypostsComponent } from './+myposts/myposts.component';

const routes: Routes = [

{ path: '', component: MainComponent },
{ path: 'signin', component: SigninComponent },
{ path: 'myposts', component: MypostsComponent },
{ path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
