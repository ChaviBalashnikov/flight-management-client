import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.interface';
import { map } from 'rxjs/operators';

const url = "http://localhost:4963"

@Injectable({
  providedIn: 'root'
})
export class FlightsService {


  constructor(private http: HttpClient) { }

  public getFlights(): Observable<Flight[]> {
    return this.http.get<{ flights: Flight[] }>(url + '/flights').pipe(map(response => response.flights))
  }
}

