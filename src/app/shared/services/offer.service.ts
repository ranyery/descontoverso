import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap } from 'rxjs';
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
  private readonly AMAZON_ID = '367';
  private readonly OFFERS_LIMIT = 12;

  private _baseUrl = environment.baseUrlApiPelando;
  private _pageInfo?: IPageInfo = undefined;

  constructor(private _http: HttpClient) {}

  public getOffers(): Observable<IOffer[]> {
    return this._http
      .get<IOfferResponse>(`${this._baseUrl}`, {
        params: {
          operationName: 'StorePromotionsQuery',
          variables: JSON.stringify({
            storeId: this.AMAZON_ID,
            limit: this.OFFERS_LIMIT,
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
        catchError((httpError: HttpErrorResponse) => {
          // TODO: Tratar erros relacionados à requisição HTTP
          throw httpError;
        }),
        tap((response) => {
          if (response.errors) {
            // TODO: Emitir um erro caso existam erros na resposta
            throw new Error(response.errors?.[0].message);
          }

          this._pageInfo = response.data?.public?.storePromotions?.pageInfo;
        }),
        map((response) => {
          const offers = response?.data?.public?.storePromotions?.edges || [];
          if (offers.length === 0) {
            // Uma possibilidade aqui é buscar mais ofertas (usando o endCursor)
            throw new Error('No offers found');
          }

          const filteredOffers = this._filterAndSortOffers(offers);
          return filteredOffers;
        }),
        retry(this.MAX_RETRIES),
        catchError((error) => {
          // TODO: Adicionar página de feedback, informando que o conteúdo está indisponível no momento e o usuário pode clicar para atualizar a página
          // window.location.reload();

          const deveTratarErroNoComponente = true;
          if (deveTratarErroNoComponente) {
            throw error;
          }

          // Esse Catch error pode dar problemas, pois o usuário não está ciente que houve um problema com a requisição
          return of([]);
        })
      );
  }

  private _filterAndSortOffers(offers: IOffer[]): IOffer[] {
    const ActiveOffersFilteredByTemperature = offers
      .filter((offer) => offer.status === 'ACTIVE' && offer.temperature >= 0)
      .sort((offerA, offerB) => offerB.temperature - offerA.temperature);

    return ActiveOffersFilteredByTemperature;
  }

  // TODO: Validar objeto de erro, semelhante a request acima
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
