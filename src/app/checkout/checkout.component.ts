import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

   checkoutForm! : FormGroup;
  httpClient: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      payment: ['', Validators.required]
    });
  }

 submitForm() {
    if (this.checkoutForm.valid) {
      const formData = this.checkoutForm.value;

      // Simulating an API call to store the data in db.json
      this.httpClient.post('http://localhost:3000/checkout', formData)
        .subscribe(
          (response: any) => {
            console.log('Data stored successfully:', response);
            this.checkoutForm.reset();
          },
          (error: any) => {
            console.error('Error storing data:', error);
          }
        );
    }
  }
}
