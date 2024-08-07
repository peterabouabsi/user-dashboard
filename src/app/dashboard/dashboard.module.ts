import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardComponent } from './pages/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
// Standalone Components
import { HeaderComponent } from '../components/header/header.component';
import { UserListComponent } from '../components/user-list/user-list.component';

@NgModule({
    declarations: [
        // Components
        DashboardComponent,
        UsersComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,

        // Standalone Components
        HeaderComponent,
        UserListComponent
    ],
    exports: [],
    providers: []
})
export class DashboardModule { }
