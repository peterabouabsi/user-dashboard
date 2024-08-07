import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

// Ngrx
import { Store } from '@ngrx/store';
// Actions
import { UserActions } from 'src/app/shared/ngrx/actions/user.actions';
// Selectors
import { selectUserState } from 'src/app/shared/ngrx/selectors/user.selectors';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

    is_loading: boolean = true;
    user$ = this.store.select(selectUserState).pipe(
        map(user_state => user_state.user),
        tap(() => this.is_loading = false)
    );
    
    constructor(private store: Store,
                private route: ActivatedRoute) { }
    ngOnInit() { 
        this.fetchUsers();
    }

    fetchUsers(): void {
        this.route.params.subscribe(params => {
            this.store.dispatch(UserActions.fetchUser({ id: params['user_id'] }));
        })
    }
    
    onPageChange(page: number): void {
        this.is_loading = true;
        this.store.dispatch(UserActions.fetchUsers({ page }));
    }


}