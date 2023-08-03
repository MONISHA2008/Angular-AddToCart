import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AppComponent } from '../app.component';
import { CartService } from '../Services/cart.service';
import { MasterService } from '../Services/master.service';
import { ProducatservicesService } from '../Services/producatservices.service';
import { RegistrationService } from '../Services/registration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private master: MasterService,
    private api: RegistrationService,
    private Productapi: ProducatservicesService,
    private app: AppComponent,
    private cart: CartService,
    private router: Router,
  ) {}

  Producatdata = new Array();
  Mobiledata = new Array();
  Fashiondata = new Array();
  Electronicsdata = new Array();
  AllData: any;
  SpinnerActive: boolean = true;
  dataloader: boolean = false;
  Spinner: string = 'assets/spinner/loading.gif';
  UserId: number = 0;
  Userdata: any;
  Cartdata: any;

  ngOnInit(): void {
    this.spinnnerfunction();
    this.getAlldata();
    this.CARTDATA();

    setInterval(() => {
      this.CARTDATA();
    }, this.app.STIME);
  }

  spinnnerfunction() {
    this.getProductdata();
    setInterval(() => {
      this.SpinnerActive = false;
      this.dataloader = true;
    }, this.app.time);
  }

  //Registration all UserData
  getAlldata() {
    this.api.getUserdata().subscribe({
      next: (data) => {
        this.Userdata = data;
        //UserData Functions
        this.userDataFunction();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userDataFunction() {
    for (let i = 0; i < this.Userdata.length; i++) {
      if (this.Userdata[i].UserId == localStorage.getItem('token')) {
        this.UserId = this.Userdata[i].id;
        break;
      }
    }
  }

  // Productdata
  getProductdata() {
    this.Productapi.getProducatdata().subscribe({
      next: (data) => {
        this.Producatdata = data;
        this.updateData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // Update product data Array
  updateData() {
    if (this.Producatdata != undefined) {
      for (let i = 0; i < this.Producatdata.length; i++) {
        if (this.Producatdata[i].productfield == 'Mobile') {
          this.Mobiledata.push(this.Producatdata[i]);
        } else if (this.Producatdata[i].productfield == 'Fashion') {
          this.Fashiondata.push(this.Producatdata[i]);
        } else if (this.Producatdata[i].productfield == 'Electronics') {
          this.Electronicsdata.push(this.Producatdata[i]);
        }
      }
      let dublicatedata = new Array();
      this.AllData = dublicatedata.concat(
        this.Electronicsdata,
        this.Mobiledata,
        this.Fashiondata
      );
    }
  }

  // Add ton Cartdata Functions
  addCart(item: number) {
    if (
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== null
    ) {
      this.CARTDATA();
      let on: boolean = false;

      for (let i = 0; i < this.Producatdata.length; i++) {
        if (this.Producatdata[i].id == item) {
          if (this.Cartdata.length != 0) {
            for (let j = 0; j < this.Cartdata.length; j++) {
              if (
                this.Cartdata[j].UserId == this.UserId &&
                this.Cartdata[j].Product_id == this.Producatdata[i].id
              ) {
                on = true;
                break;
              }
            }

            if (on === false) {
              if (this.UserId != 0) {
                let cart_data = {
                  Product_id: this.Producatdata[i].id,
                  Productname: this.Producatdata[i].productname,
                  Productfield: this.Producatdata[i].productfield,
                  Productimage: this.Producatdata[i].productimage,
                  Productprice: this.Producatdata[i].productprice,
                  UserId: this.UserId,
                  CountProduct: 1,
                };
                this.cart.postCart(cart_data).subscribe({
                  next: (data) => {},
                  error: (err) => {
                    console.log(err);
                  },
                });
              }
            }
          } else if (this.Cartdata.length == 0) {
            let cart_data = {
              Product_id: this.Producatdata[i].id,
              Productname: this.Producatdata[i].productname,
              Productfield: this.Producatdata[i].productfield,
              Productimage: this.Producatdata[i].productimage,
              Productprice: this.Producatdata[i].productprice,
              UserId: this.UserId,
              CountProduct: 1,
            };
            this.cart.postCart(cart_data).subscribe({
              next: (data) => {},
              error: (err) => {
                console.log(err);
              },
            });
          }
          break;
        }
      }
    }else{
      this.router.navigate(['/cart']);
    }
  }

  CARTDATA() {
    this.cart.getCart().subscribe({
      next: (data) => {
        this.Cartdata = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

