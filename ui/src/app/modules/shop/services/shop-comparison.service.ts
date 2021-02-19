import { Injectable } from '@angular/core';

import { ComparisonService } from '@ui/core/services';

import { ShopCategory, ShopProductStatus } from '../models';

export enum Comparisons {
    CATEGORY = 'name'
}

@Injectable({
    providedIn: 'root'
})
export class ShopComparisonService extends ComparisonService {
    constructor() {
        super();
    }

    categories = (c1: ShopCategory, c2: ShopCategory) => {
        if(c1.name > c2.name) return 1;
        if(c1.name < c2.name) return -1;

        return 0;
    };

    productStatuses = (ps1: ShopProductStatus, ps2: ShopProductStatus) => {
        if(ps1.status > ps2.status) return 1;
        if(ps1.status < ps1.status) return -1;

        return 0;
    };
}
