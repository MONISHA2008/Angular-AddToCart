import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/Services/cart.service';
import { MasterService } from 'src/app/Services/master.service';
import { ProducatservicesService } from 'src/app/Services/producatservices.service';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
  constructor(
    private master: MasterService,
    private api: RegistrationService,
    private Productapi: ProducatservicesService,
    private app: AppComponent,
    private cart: CartService
  ) {}

  Producatdata: any;
  Mobiledata = new Array();
  SpinnerActive: boolean = true;
  dataloader: boolean = false;
  Spinner: string = 'assets/spinner/loading.gif';
  Cartdata: any;
  UserId: number = 0;
  Userdata: any;

  ngOnInit(): void {
    this.getAlldata();
    this.spinnnerfunction();
  }
  spinnnerfunction() {
    this.getProductdata();
    setInterval(() => {
      this.SpinnerActive = false;
      this.dataloader = true;
    }, this.app.time);
  }

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

  userDataFunction() {
    for (let i = 0; i < this.Userdata.length; i++) {
      if (this.Userdata[i].UserId == localStorage.getItem('token')) {
        this.UserId = this.Userdata[i].id;
        break;
      }
    }
  }

  updateData() {
    for (let i = 0; i < this.Producatdata.length; i++) {
      if (this.Producatdata[i].productfield == 'Mobile') {
        this.Mobiledata.push(this.Producatdata[i]);
      }
    }
  }

  addCart(item: number) {
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
  }

  CARTDATA() {
    this.Cartdata = new Array<any>();

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
