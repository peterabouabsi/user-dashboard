import { Injectable } from '@angular/core';

// Services
import { ApiService } from '../api.service';

@Injectable({providedIn: 'root'})
export class UserService {
    
    constructor(private apiService: ApiService) { }
    
    fetchUsers<T>(page: number = 1) {
        return this.apiService.get<T>(`users?page=${page}`);
    }

    fetchUser<T>(id: number) {
        return this.apiService.get<T>(`users/${id}`);
    }

    search<T>(id?: string | null) {
        const query = id? `?id=${id}` : ``;
        return this.apiService.get<T>(`users${query}`);
    }
}