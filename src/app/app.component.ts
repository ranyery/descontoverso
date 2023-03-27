import { Component, HostListener, OnInit } from '@angular/core';

import { IOffer } from './shared/interfaces/offer-response';
import { OfferService } from './shared/services/offer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public offers: IOffer[] = [];
  public isLoading: boolean = true;

  constructor(private _offerService: OfferService) {}

  ngOnInit(): void {
    this._getOffers();
  }

  private _getOffers() {
    this.isLoading = true;
    this._offerService.getOffers().subscribe({
      next: (offers) => {
        this.offers.push(...offers);
        this.isLoading = false;
      },
      error: () => {},
      complete: () => {},
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - clientHeight * 0.2 &&
      !this.isLoading
    ) {
      this._getOffers();
    }
  }

  public identify(index: number, offer: IOffer) {
    return offer.id;
  }
}
