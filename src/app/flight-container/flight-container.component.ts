import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { Subscription } from 'rxjs';
import { Flight } from '../models/flight.interface';

@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrl: './flight-container.component.scss'
})
export class FlightContainerComponent implements OnInit, OnDestroy {
  public flights: Flight[] = []
  public subscription: Subscription = new Subscription()



  constructor(private flightService: FlightsService) { }


  ngOnInit(): void {
    this.subscription.add(
      this.flightService.getFlights().subscribe(data => {
        this.flights = data
      })
    )

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
