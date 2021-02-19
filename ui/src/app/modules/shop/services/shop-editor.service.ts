import { Injectable } from '@angular/core';

import { EditorService } from '@ui/core/services';

import { ShopCategory, ShopProduct } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ShopEditorService extends EditorService {
    private category: ShopCategory;
    private product: ShopProduct;

    constructor() {
        super();
    }

    getCategory(): ShopCategory {
        return this.category;
    }

    hasCategory(): boolean {
        return this.category != null;
    }

    setCategory(category: ShopCategory): void {
        this.category = category;
    }

    getProduct(): ShopProduct {
        return this.product;
    }

    hasProduct(): boolean {
        return this.product != null;
    }

    setProduct(product: ShopProduct): void {
        this.product = product;
    }
}
