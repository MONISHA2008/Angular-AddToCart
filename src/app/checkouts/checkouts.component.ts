import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkouts',
  templateUrl: './checkouts.component.html',
  styleUrls: ['./checkouts.component.css']
})
export class CheckoutsComponent implements OnInit {
  router: any;
  Check! : FormGroup;
    constructor(private http:HttpClient){}

    Checkout:any=[];

  Name: string |  undefined;
  Address: string |  undefined;
  PhoneNumber: string | undefined;
  PaymentMethod: string | undefined;

checkout(){
  var val = {
    Name: this.Name,
    Address:this.Address,
    PhoneNumber:this.PhoneNumber,
    PaymentMethod: this.PaymentMethod,
  };

  this.http.post('http://localhost:5285/api/Checkout', val)
    .subscribe(res => {
      alert(res.toString());

      this.router.navigate(['/checkout'])
      this.refreshList();
    });

  this.router.navigate(['/checkout'])
}

  ngOnInit() {
    this.refreshList();
  }

  addClick() {
  this.Name = "";
  this.Address = "";
  this.PhoneNumber = "";
  this.PaymentMethod = "";
}
editClick(checkout:any) {

  this.Name=checkout.Name;
  this.Address = checkout.Address;
  this.PhoneNumber = checkout.PhoneNumber;
  this.PaymentMethod = checkout.PaymentMethod;
}
refreshList()
 {
   this.http.get<any>(environment.API_URL + 'PersonalDetail')
    .subscribe(data =>
    {
      this.Checkout=data;
    });
 }
createClick() {
  var val = {
    Name: this.Name,
    Address:this.Address,
    PhoneNumber:this.PhoneNumber,
    PaymentMethod: this.PaymentMethod,
  };

  this.http.post(environment.API_URL + 'Checkout', val)
    .subscribe((res) => {
      alert(res.toString());

      this.router.navigate(['checkouts'])
      this.refreshList();
    });
}

updateClick() {
  var val = {
    Name: this.Name,
    Address:this.Address,
    PhoneNumber:this.PhoneNumber,
    PaymentMethod: this.PaymentMethod,


  };

  this.http.put(environment.API_URL + 'Checkout', val)
    .subscribe((res) => {
      alert(res.toString());
      this.refreshList();
    });
}

}
