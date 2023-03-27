import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import {
  IOffer,
  IOfferResponse,
  IPageInfo,
} from '../interfaces/offer-response';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private _baseUrl = 'https://www.pelando.com.br/api/graphql';
  private _pageInfo?: IPageInfo = undefined;

  constructor(private http: HttpClient) {}

  public getOffers(): Observable<IOffer[]> {
    return this.http
      .get<IOfferResponse>(`${this._baseUrl}`, {
        params: {
          operationName: 'StorePromotionsQuery',
          variables: JSON.stringify({
            storeId: '367',
            limit: 25,
            after: this._pageInfo?.endCursor,
          }),
          extensions: JSON.stringify({
            persistedQuery: {
              version: 1,
              sha256Hash:
                '0ba0e4c4a5388690b697aa3fef34c48183ac05766d21edb100c050e751cc0d1a',
            },
          }),
        },
      })
      .pipe(
        map((response) => {
          this._pageInfo = response?.data?.public?.storePromotions?.pageInfo;

          const edges = response?.data?.public?.storePromotions?.edges || [];
          const activeOffers = edges.filter(
            (offer) => offer?.status === 'ACTIVE' && offer?.temperature >= 0
          );
          return activeOffers;
        })
      );
  }
}
