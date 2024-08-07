import { createFeatureSelector, createSelector } from "@ngrx/store";

// Models
import { PaginatedResponse } from "../../models/paginated-response";

// Ngrx 
//Actions
import { User } from "../actions/user.actions";

const selectFeatureUser = createFeatureSelector<{ 
    users: PaginatedResponse<User>, 
    cachedUsers: Map<number, PaginatedResponse<User>>,
    
    user: User | null,
    cachedUsersDetails: Map<number, User>,

    searchedUser: User | null,
    cachedSearchedUser: Map<string, User>
}>('users');

export const selectUserState = createSelector(selectFeatureUser, (state) => state);