import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public signupForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    keep_logged_in: [false, [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loginService.post(this.signupForm.value).pipe(catchError(
        (error) => {
          this.snackBar.open("Wrong email or password", 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          throw error;
        }
      )).subscribe(
        (response) => {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('role', response.data.role);
          localStorage.setItem('refresh', response.data.refresh);
          this.router.navigate(['/dashboard']);
        },
      );
    }
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }
}
