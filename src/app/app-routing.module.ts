import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';

const routes: Routes = [
  {path: '', component: AboutMeComponent , pathMatch:'full'},
  { path: 'presentation', component: AboutMeComponent },
  {path: '**', redirectTo: 'presentation', pathMatch:'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
