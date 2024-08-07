import { createActionGroup, props } from "@ngrx/store";

// Models
import { PaginatedResponse } from "../../models/paginated-response";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export const UserActions = createActionGroup({
    source: 'users',
    events: {
        'Fetch Users': props<{ page: number }>(),
        'Fetch Users Success': props<{users: PaginatedResponse<User>}>(),
        'Fetch Users Failed': props<{error: any}>(),

        'Fetch User': props<{ id: number }>(),
        'Fetch User Success': props<{ user: User }>(),
        'Fetch User Failed': props<{error: any}>(),

        'Search User': props<{ keyword: string }>(),
        'Search User Success': props<{ user: User; keyword: string }>(),
        'Search User Failed': props<{error: any}>(),
    }
})