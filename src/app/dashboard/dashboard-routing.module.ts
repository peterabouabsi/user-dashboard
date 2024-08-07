import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { DashboardComponent } from './pages/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

const routes: Routes = [
    { 
        path: '',
        component: DashboardComponent,
        children: [
            {
                path: '',
                component: UsersComponent
            },
            {
                path: ':user_id',
                component: UserDetailsComponent
            }        
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
