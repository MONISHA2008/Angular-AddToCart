import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { RegistrationService } from '../Services/registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup;
  Userdata: any;
  userLogin: boolean = false;
  constructor(
    private app: AppComponent,
    private formbuilder: FormBuilder,
    private api: RegistrationService,
    private router: Router
  ) {
    this.LoginForm = formbuilder.group({
      email: formbuilder.control('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
      ]),
      password: formbuilder.control('', [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }
  Images: any;
  ngOnInit(): void {
    this.Images = this.app.images[0];
    this.getAllproduct();
    console.log(this.Userdata);
  }

  onSubmit() {
    debugger;
    if (this.Userdata != undefined) {
      for (var i = 0; i < this.Userdata.length; i++) {
        if (
          this.Userdata[i].email == this.LoginForm.value.email &&
          this.Userdata[i].password == this.LoginForm.value.password
        ) {
          this.userLogin = true;
          break;
        }
      }

      if (this.userLogin == true) {
        localStorage.setItem('token', this.Userdata[i].UserId);
        this.userLogin = false;
        this.router.navigate(['/']);
      } else {
        alert('Email and password is not valid');
      }
    }
  }

  getAllproduct() {
    this.api.getUserdata().subscribe({
      next: (res) => {
        this.Userdata = res;
      },
      error: (err) => {
        alert('Error');
      },
    });
  }
}
