import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  retry,
  tap,
  throwIfEmpty,
} from 'rxjs';
import { environment } from 'src/environments/environment';

import { IOfferInfoResponse } from '../interfaces/offer-info-response';
import {
  IOffer,
  IOfferResponse,
  IPageInfo,
} from '../interfaces/offer-response';

@Injectable({ providedIn: 'root' })
export class OfferService {
  private readonly MAX_RETRIES = 3;
  private readonly RETRY_DELAY_MS = 1000;

  private _baseUrl = environment.baseUrlApiPelando;
  private _pageInfo?: IPageInfo = undefined;

  constructor(private readonly _http: HttpClient) {}

  public getOffers(): Observable<IOffer[]> {
    return this._http
      .get<IOfferResponse>(`${this._baseUrl}`, {
        params: {
          operationName: 'StorePromotionsQuery',
          variables: JSON.stringify({
            storeId: '367',
            limit: 12,
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
        tap((response) => {
          if (response.errors) {
            throw new Error(response.errors[0].message);
          }

          this._pageInfo = response.data?.public?.storePromotions?.pageInfo;
        }),
        map((response) => response?.data?.public?.storePromotions?.edges || []),
        filter((edges) => edges.length > 0),
        mergeMap((edges) => {
          const activeOffers = edges
            .filter(
              (offer) => offer?.status === 'ACTIVE' && offer?.temperature >= 0
            )
            .sort(
              (offerA, offerB) => offerB?.temperature - offerA?.temperature
            );
          return of(activeOffers).pipe(
            throwIfEmpty(() => new Error('No active offers found'))
          );
        }),
        retry(this.MAX_RETRIES),
        delay(this.RETRY_DELAY_MS),
        catchError(() => {
          window.location.reload();

          return of([]);
        })
      );
  }

  public getOfferById(id: string) {
    return this._http
      .get<IOfferInfoResponse>(`${this._baseUrl}`, {
        params: {
          operationName: 'OfferQuery',
          variables: JSON.stringify({ id }),
          extensions: JSON.stringify({
            persistedQuery: {
              version: 1,
              sha256Hash:
                'f11464ce6daa1a5aca323b04fd4a348c6100ed19bb98767fb7a0d789b26eb39d',
            },
          }),
        },
      })
      .pipe(
        map((response) => {
          const offer = response.data.public.offer;
          return offer;
        })
      );
  }
}
