import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { SignupService } from '../services/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('^.*(?=.{8,100})(?=.*[a-zA-Z])(?=.*[a-z])(?=.*\\d)[a-zA-Z0-9].*$')]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { confirmPassword, ...value } = this.signupForm.value;
    if (this.password?.value !== this.confirmPassword?.value) {
      this.confirmPassword?.setErrors({ passwordMatch: true });
    }
    if (this.signupForm.valid) {
      this.signupService.post(value).pipe(catchError(
        (error) => {
          this.snackBar.open(error.error.detailed, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          throw error;
        }
      )).subscribe(
        (response) => {
          this.snackBar.open(response.detailed, 'Close', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/auth/login']);
        },
      );
    }
  }

  get username() {
    return this.signupForm.get('username');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
