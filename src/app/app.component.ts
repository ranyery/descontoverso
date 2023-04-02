import { Component, OnInit } from '@angular/core';
import { inject as injectVercelAnalytics } from '@vercel/analytics';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, Storage],
})
export class AppComponent implements OnInit {
  constructor(
    private _primengConfig: PrimeNGConfig,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._primengConfig.ripple = true;

    // ? Validação para não mandar view para o analytics da Vercel
    const mode = this._localStorage.getItem('mode');
    if (window.location.href.includes('localhost') || mode === 'debug') {
      return;
    }

    injectVercelAnalytics();
  }
}
