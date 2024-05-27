import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Flight } from '../models/flight.interface';
import { map, take } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { calculateFlightDelay } from '../utils';
import { cloneDeep } from 'lodash';

const url = "http://localhost:4963";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  private flights: BehaviorSubject<Flight[]> = new BehaviorSubject([]);


  constructor(private http: HttpClient, private socket: Socket) { }

  public get flightsList(): Observable<Flight[]> {
    return this.flights.asObservable();
  }

  public getFlights(): void {
    this.http.get<{ flights: Flight[] }>(`${url}/flights`).pipe(take(1)).subscribe(response => {
      this.flights.next(response.flights)
    })
  }

  public getRealTimeFlightUpdates(): void {
    this.socket.fromEvent<Flight>('flight-update').subscribe(updatedFlight => {
      const flightsData = cloneDeep(this.flights.value);
      const index = flightsData.findIndex(flight => flight.flightNumber === updatedFlight.flightNumber);
      if (index !== -1) {
        const oldValue = flightsData[index];
        updatedFlight.takeoffTimeDelay = calculateFlightDelay(oldValue.takeoffTime, updatedFlight.takeoffTime);
        updatedFlight.landingTimeDelay = calculateFlightDelay(oldValue.landingTime, updatedFlight.landingTime);
        flightsData[index] = updatedFlight;
      } else {
        flightsData.push(updatedFlight);
      }
      this.flights.next(flightsData)
    })
  }
}


