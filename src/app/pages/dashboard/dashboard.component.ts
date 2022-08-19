import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  constructor() { }

  ngOnInit(): void {
  }

}
