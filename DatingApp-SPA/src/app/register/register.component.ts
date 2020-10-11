import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;

  bsConfig: Partial<BsDatepickerConfig>;

  // model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder) { }

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
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertify.success('register successful');
    // }, error => {
    //   this.alertify.error(error);
    // });
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);

  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : { mismatch: true };
  }

  cancel(): void {
    this.cancelRegister.emit();
  }

}
