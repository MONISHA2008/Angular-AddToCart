import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { CartService } from '../Services/cart.service';
import { MasterService } from '../Services/master.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.scss'],
})
export class NavebarComponent implements OnInit {
  constructor(
    private app: AppComponent,
    private master: MasterService,
    private api: RegistrationService,
    private cart: CartService
  ) {}
  Title: any;
  myImage: any;
  loginActive: boolean = false;
  loginNotActive: boolean = true;
  Userdata: any;
  homeUserActive: boolean = false;
  CartdataCount: number = 0;
  Cartdata: any;
  UserId: number = 0;
  NewCartdata = new Array<any>();

  ngOnInit(): void {
    this.Title = this.app.title;
    this.myImage = this.app.images[1];
    this.getAlldata();
    this.CARTDATA();
    setInterval(() => {
      this.checkfunction();
      if (localStorage.getItem('token') != null) {
        if (localStorage.getItem('token') == this.Userdata[0].UserId) {
          this.homeUserActive = true;
        } else {
          this.homeUserActive = false;
        }
      }
    }, 1);

    setInterval(() => {
      this.CARTDATA();
    }, this.app.time);
  }

  checkfunction() {
    if (localStorage.getItem('token') != null) {
      this.loginActive = true;
      this.loginNotActive = false;
    } else {
      this.loginNotActive = true;
      this.loginActive = false;
    }
  }

  getAlldata() {
    this.api.getUserdata().subscribe({
      next: (data) => {
        this.Userdata = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  CARTDATA() {
    this.cart.getCart().subscribe({
      next: (data) => {
        this.Cartdata = data;
        this.userCartDataCart();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  userCartDataCart() {
    if (this.Cartdata != undefined && this.Userdata != undefined) {
      for (let i = 0; i < this.Userdata.length; i++) {
        if (this.Userdata[i].UserId == localStorage.getItem('token')) {
          this.UserId = this.Userdata[i].id;
        }
      }
      this.cartCase();
    }
  }

  cartCase() {
    let UserCartData = new Array();
    for (let i = 0; i < this.Cartdata.length; i++) {
      if (this.Cartdata[i].UserId == this.UserId) {
        UserCartData.push(this.Cartdata[i]);
      }
    }
    this.CartdataCount = UserCartData.length;
  }

  logout() {
    localStorage.removeItem('token');
    this.master.loginFunction();
  }
}
