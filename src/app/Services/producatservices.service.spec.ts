/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducatservicesService } from './producatservices.service';

describe('Service: Producatservices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducatservicesService]
    });
  });

  it('should ...', inject([ProducatservicesService], (service: ProducatservicesService) => {
    expect(service).toBeTruthy();
  }));
});
