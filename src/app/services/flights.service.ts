import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.interface';
import { map } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
const url = "http://localhost:4963"

@Injectable({
  providedIn: 'root'
})
export class FlightsService {


  constructor(private http: HttpClient, private socket: Socket) { }


  public getFlights(): Observable<Flight[]> {
    return this.http.get<{ flights: Flight[] }>(url + '/flights').pipe(map(response => response.flights))
  }

  public getFlightUpdates() {
    return this.socket.fromEvent<Flight>('flight-update')
  }







}

