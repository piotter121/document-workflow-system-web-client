import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidatorsService } from '../../shared/app-validators.service';
import { ToastNotificationService } from '../../shared/toast-notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: FormGroup;

  static MatchPassword(abstractControl: AbstractControl) {
    const password: AbstractControl = abstractControl.get('password');
    const passwordValue: string = password.value;
    const passwordRepeated: AbstractControl = abstractControl.get('passwordRepeated');
    const passwordRepeatedValue: string = passwordRepeated.value;
    const notMatched: boolean = passwordValue && passwordRepeatedValue
      && passwordValue !== passwordRepeatedValue;
    const passwordRepeatedErrors = passwordRepeated.errors;
    if (notMatched) {
      if (passwordRepeatedErrors) {
        passwordRepeated.errors['MatchPassword'] = true;
      } else {
        passwordRepeated.setErrors({
          'MatchPassword': true
        });
      }
    } else if (passwordRepeatedErrors) {
      delete passwordRepeated.errors['MatchPassword'];
    }
  }

  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private appValidators: AppValidatorsService,
              private toastNotification: ToastNotificationService) {
  }

  ngOnInit() {
    this.newUser = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email], this.appValidators.nonExistingUserEmail()],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeated: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: RegisterComponent.MatchPassword
    });
  }

  get email() {
    return this.newUser.get('email');
  }

  get firstName() {
    return this.newUser.get('firstName');
  }

  get lastName() {
    return this.newUser.get('lastName');
  }

  get passwordRepeated() {
    return this.newUser.get('passwordRepeated');
  }

  get password() {
    return this.newUser.get('password');
  }

  register() {
    this.authService.register({
      email: this.email.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      password: this.password.value
    }).then(
      () => this.router.navigate(['/login']),
      () => this.toastNotification.error('dws.auth.register.failure')
    );
  }
}
