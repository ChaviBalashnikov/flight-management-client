import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { Subscription } from 'rxjs';
import { Flight } from '../models/flight.interface';
import { FlightsTableComponent } from '../components/flights-table/flights-table.component';
import { calculateDelay } from '../utils';
import cloneDeep from 'lodash.clonedeep';

@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrl: './flight-container.component.scss'
})
export class FlightContainerComponent implements OnInit, OnDestroy {
  public flights: Flight[] = []
  public subscription: Subscription = new Subscription()

  @ViewChild(FlightsTableComponent) flightTableComponent: FlightsTableComponent;


  constructor(private flightService: FlightsService) { }


  ngOnInit(): void {
    this.subscription.add(
      this.flightService.getFlights().subscribe(data => {
        this.flights = data

      }));
    this.flightService.getFlightUpdates()
    this.subscription.add(
      this.flightService.getFlightUpdates().subscribe(updatedFlight => {
        const index = this.flights.findIndex(flight => flight.flightNumber === updatedFlight.flightNumber);
        if (index !== -1) {
          const oldValue = cloneDeep(this.flights[index]);
          updatedFlight.takeoffTimeDelay = calculateDelay(oldValue.takeoffTime, updatedFlight.takeoffTime);
          updatedFlight.landingTimeDelay = calculateDelay(oldValue.landingTime, updatedFlight.landingTime);
          this.flights[index] = updatedFlight;
        } else {
          this.flights.push(updatedFlight);
        }
        if (this.flightTableComponent) {
          this.flightTableComponent.flights = this.flights;
        }

      })
    )
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


}
