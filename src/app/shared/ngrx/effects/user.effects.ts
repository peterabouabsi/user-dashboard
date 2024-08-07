import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap, withLatestFrom } from "rxjs";

// Services
import { UserService } from "../../services/user/user.service";

// Models
import { PaginatedResponse } from "../../models/paginated-response";

// Ngrx
import { Store } from "@ngrx/store";
import { selectUserState } from "../selectors/user.selectors";
// Actions
import { User, UserActions } from "../actions/user.actions";

@Injectable({
    providedIn: 'root'
})
export class UserEffects {

    constructor(private actions$: Actions,
                private store: Store,
                private userService: UserService) { }

        load_users$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(UserActions.fetchUsers),
                withLatestFrom(this.store.select(selectUserState)),
                switchMap(([action, state]) => {
                    const cachedPage = state.cachedUsers.get(action.page);
                    if (cachedPage) {
                        return of(UserActions.fetchUsersSuccess({ users: cachedPage }));
                    } else {
                        return this.userService.fetchUsers<PaginatedResponse<User>>(action.page).pipe(
                            map(users => UserActions.fetchUsersSuccess({ users })),
                            catchError(error => of(UserActions.fetchUsersFailed({ error })))
                        );
                    }
                })
            );
        });

        load_user$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(UserActions.fetchUser),
                withLatestFrom(this.store.select(selectUserState)),
                switchMap(([action, state]) => {
                    const cachedUser = state.cachedUsersDetails.get(Number(action.id));
                    if (cachedUser) {
                        return of(UserActions.fetchUserSuccess({ user: cachedUser }));
                    } else {
                        return this.userService.fetchUser<{data: User}>(action.id).pipe(
                            map(user => UserActions.fetchUserSuccess({ user: user.data })),
                            catchError(error => of(UserActions.fetchUserFailed({ error })))
                        );
                    }
                })
            );
        });

        search_user$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(UserActions.searchUser),
                withLatestFrom(this.store.select(selectUserState)),
                switchMap(([action, state]) => {
                    const cachedUser = state.cachedSearchedUser.get(action.keyword);
                    if (cachedUser) {
                        return of(UserActions.searchUserSuccess({ user: cachedUser, keyword: action.keyword }));
                    } else {
                        return this.userService.search<{data: User}>(action.keyword).pipe(
                            map(user => UserActions.searchUserSuccess({ user: user.data, keyword: action.keyword })),
                            catchError(error => of(UserActions.fetchUserFailed({ error })))
                        );
                    }
                })
            );
        });
}