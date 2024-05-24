import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightContainerComponent } from './flight-container/flight-container.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'flight-board' },
  { path: 'flight-board', component: FlightContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
