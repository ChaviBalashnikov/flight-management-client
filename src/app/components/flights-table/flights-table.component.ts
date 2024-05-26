import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Flight } from '../../models/flight.interface';






@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrl: './flights-table.component.scss'
})
export class FlightsTableComponent {
  @Input() set flights(value: Flight[]) {
    this.dataSource.data = value;
  }
  dataSource: MatTableDataSource<Flight> = new MatTableDataSource();
  displayedColumns: string[] = ['flightNumber', 'landingAirport', 'landingTime', 'takeoffAirport', 'takeoffTime', 'status',];


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

}
