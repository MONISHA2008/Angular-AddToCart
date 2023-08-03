import { Component, OnInit } from '@angular/core';
//import { OfferService } from '../Services/offer.service';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit{

 isOfferValid: boolean | undefined;
  days: number | undefined;
  hours: number | undefined;
  mins: number | undefined;
  secs: number | undefined;

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  offer() {
    this.isOfferValid = true;

    const x = setInterval(() => {
      const futureDate = new Date('June 28, 2023 01:24:07').getTime();
      const today = new Date().getTime();
      const balanceTime = futureDate - today;

      this.days = Math.floor(balanceTime / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((balanceTime / (1000 * 60 * 60)) % 24);
      this.mins = Math.floor((balanceTime / (1000 * 60)) % 60);
      this.secs = Math.floor((balanceTime / 1000) % 60);

      if (balanceTime <= 0) {
        clearInterval(x);
        this.days = 0;
      }
    }, 1000);
  }
}
