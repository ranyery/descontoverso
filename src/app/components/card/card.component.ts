import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { IOffer } from 'src/app/shared/interfaces/offer-response';
import { OfferService } from 'src/app/shared/services/offer.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() offer!: IOffer;

  constructor(private _offerService: OfferService, private _router: Router) {}

  ngOnInit(): void {}

  public openLink() {
    this._offerService.getOfferById(this.offer.id).subscribe({
      next: (response) => {
        const sourceUrl = response.sourceUrl;
        let queryParams = '';
        if (sourceUrl.includes('?')) {
          queryParams =
            '&linkCode=ll1&tag=descontoverso-20&language=pt_BR&ref_=as_li_ss_tl';
        } else {
          queryParams =
            '?&linkCode=ll1&tag=descontoverso-20&language=pt_BR&ref_=as_li_ss_tl';
        }
        window.open(sourceUrl + queryParams, '_blank');
      },
      error: () => {},
      complete: () => {},
    });
  }
}
