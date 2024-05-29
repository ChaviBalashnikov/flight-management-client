import { Component, OnInit } from '@angular/core';
import { FlightsService } from '../services/flights.service';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.interface';


@Component({
  selector: 'app-flight-container',
  templateUrl: './flight-container.component.html',
  styleUrl: './flight-container.component.scss'
})
export class FlightContainerComponent implements OnInit {
  public flightsList: Observable<Flight[]>;

  constructor(private flightService: FlightsService) { }

  ngOnInit(): void {
    this.flightService.getFlights();
    this.flightsList = this.flightService.flightsList
    this.flightService.getRealTimeFlightUpdates();
  }

}
