import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'users', 
    pathMatch: 'full' 
  },
  { 
    path: 'users', 
    loadChildren: () => import('./dashboard/dashboard.module').then(module => module.DashboardModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
