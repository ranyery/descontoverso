import { Component, HostListener, OnInit } from '@angular/core';
import { IOffer } from 'src/app/shared/interfaces/offer-response';
import { OfferService } from 'src/app/shared/services/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
    const lastCardId = this.offers.at(this.offers.length - 12)?.id;
    const lastElement = document.getElementById(lastCardId!);
    const rect = lastElement?.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect!.bottom <= windowHeight && !this.isLoading) {
      this._getOffers();
    }
  }

  public identify(index: number, offer: IOffer) {
    return offer.id;
  }
}
