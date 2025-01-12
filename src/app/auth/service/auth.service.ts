import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Add logic to verify token validity
    return !!token;
  }
}
