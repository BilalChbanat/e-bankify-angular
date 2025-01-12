import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Angular handles CSS here
})
export class LoginComponent {
  private readonly API_URL = 'http://localhost:8081/auth/login';
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.login(formData);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Form Error',
        text: 'Please fill out the form correctly!',
        confirmButtonText: 'Okay',
        customClass: {
          popup: 'custom-swal-popup', // Apply custom CSS class
        },
      });
    }
  }

  private login(formData: any) {
    this.http.post(this.API_URL, formData).subscribe({
      next: (response: any) => {
        console.log('Login successful!', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed!', error);
        Swal.fire({
          icon: 'error',
          showConfirmButton: true,
          timer: 2000,
          title: 'Login Failed',
          text: 'Invalid email or password. Please try again.',

        });
      },
    });
  }

  protected readonly RegisterComponent = RegisterComponent;
}
