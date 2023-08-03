import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root',
})
export class MasterService {

constructor(private router: Router, private api: RegistrationService) {}
  Userdata: any;

  isLogin() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }

  loginFunction() {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/Login']);
    }
  }

  roleFunction() {
    this.getAllproduct();
    if (this.Userdata != undefined) {
      if (localStorage.getItem('token') == this.Userdata[0].UserId) {
        return true;
      } else {
        return false;
      }
    }else {
      return false
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
