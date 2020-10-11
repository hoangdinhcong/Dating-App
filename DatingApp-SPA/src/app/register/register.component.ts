import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;

  bsConfig: Partial<BsDatepickerConfig>;

  user: User;

  constructor(private authService: AuthService, private alertify: AlertifyService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.bsConfig = {
      containerClass: 'theme-red'
    };

    this.createRegisterForm();
  }

  createRegisterForm(): void {

    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', [Validators.required]],
      knownAs: ['', [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  register(): void {

    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('register successful');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  cancel(): void {
    this.cancelRegister.emit();
  }

}
