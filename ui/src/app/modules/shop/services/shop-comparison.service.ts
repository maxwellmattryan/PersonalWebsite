import { Injectable } from '@angular/core';
import { ShopCategory } from '../models';

export enum Comparisons {
    CATEGORY = 'name'
}

@Injectable({
    providedIn: 'root'
})
export class ShopComparisonService {
    constructor() { }

    categories = (c1: ShopCategory, c2: ShopCategory) => {
        if(c1.name > c2.name) return 1;
        if(c1.name < c2.name) return -1;

        return 0;
    };
}
