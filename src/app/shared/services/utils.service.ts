import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  constructor() {}

  public slugify(text: string = ''): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '-')
      .replace(/--+/g, '-');
  }
}
