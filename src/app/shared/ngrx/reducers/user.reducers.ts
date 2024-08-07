import { createReducer, on } from "@ngrx/store";

// Ngrx
// Actions
import { User, UserActions } from "../actions/user.actions";

// Models
import { PaginatedResponse } from "../../models/paginated-response";

const initialState: { 
    users: PaginatedResponse<User>,
    cachedUsers: Map<number, PaginatedResponse<User>>,

    user: User | null,
    cachedUsersDetails: Map<number, User>,

    searchedUser: User | null,
    cachedSearchedUser: Map<string, User>
} = {
    users: {
        page: 1,
        per_page: 6,
        total: 12,
        total_pages: 2,
        data: []
    },
    cachedUsers: new Map<number, PaginatedResponse<User>>(),

    user: null,
    cachedUsersDetails: new Map<number, User>(),
    
    searchedUser: null,
    cachedSearchedUser: new Map<string, User>()
}

export const UserReducer = createReducer(
    initialState,
    on(UserActions.fetchUsersSuccess, (state, { users }) => {
        const updatedCache = new Map(state.cachedUsers);
        updatedCache.set(users.page, users);

        return {
            ...state,
            users,
            cachedUsers: updatedCache
        };
    }),
    on(UserActions.fetchUsersFailed, () => initialState),

    on(UserActions.fetchUserSuccess, (state, { user }) => {
        const updatedCache = new Map(state.cachedUsersDetails);
        updatedCache.set(user.id, user);

        return {
            ...state,
            user,
            cachedUsersDetails: updatedCache
        };
    }),
    on(UserActions.fetchUserFailed, () => initialState),

    on(UserActions.searchUserSuccess, (state, { keyword, user }) => {
        const updatedCache = new Map(state.cachedSearchedUser);
        updatedCache.set(keyword, user);
        if(!keyword) return{
            ...state,
            searchedUser: null,
            cachedSearchedUser: updatedCache
        } 
        return {
            ...state,
            searchedUser: user,
            cachedSearchedUser: updatedCache
        };
    }),
    on(UserActions.searchUserFailed, () => initialState)
);
