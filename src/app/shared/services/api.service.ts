import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

// Environments
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    private readonly api_base_url: string = environment.api_base_url;

    constructor(private http: HttpClient){}

    get<T>(path: string): Observable<T> {
        return this.http.get<T>(`${this.api_base_url}${path}`);
    }
    post<T, Y>(path: string, body: Y): Observable<T> {
        return this.http.post<T>(`${this.api_base_url}${path}`, body);
    }
    put<T, Y>(path: string, body: Y): Observable<T> {
        return this.http.put<T>(`${this.api_base_url}${path}`, body);
    }
    delete<T>(path: unknown): Observable<T> {
        return this.http.delete<T>(`${this.api_base_url}${path}`);
    }
}