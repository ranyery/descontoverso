import { Component, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  constructor(private _primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this._primengConfig.ripple = true;
  }
}
