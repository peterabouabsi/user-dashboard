import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { combineLatest, map, Observable, tap } from 'rxjs';

// Models
import { PaginatedResponse } from 'src/app/shared/models/paginated-response';

// Standalone Components
import { SpinnerComponent } from "../spinner/spinner.component";
import { PaginationComponent } from "../pagination/pagination.component";

// Ngrx
import { Store } from '@ngrx/store';
// Selectors
import { selectUserState } from 'src/app/shared/ngrx/selectors/user.selectors';
// Actions
import { User, UserActions } from 'src/app/shared/ngrx/actions/user.actions';

@Component({
    selector: 'app-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        
        // Standalone Components
        SpinnerComponent,
        PaginationComponent
    ]
})

export class UserListComponent implements OnInit {

    is_loading: boolean = true;

    // Searched User if exist
    user$: Observable<User | null> = this.store.select(selectUserState).pipe(
        map(user_state => user_state.searchedUser),
        tap(() => this.is_loading = false)
    );

    // Users list
    users$: Observable<PaginatedResponse<User>> = this.store.select(selectUserState).pipe(
        map(user_state => user_state.users),
        tap(() => this.is_loading = false)
    );
    
    constructor(private store: Store) { }
    ngOnInit() { 
        this.fetchUsers();
    }

    fetchUsers(): void {
        this.store.dispatch(UserActions.fetchUsers({ page: 1 }));
    }
    
    onPageChange(page: number): void {
        this.is_loading = true;
        this.store.dispatch(UserActions.fetchUsers({ page }));
    }

}