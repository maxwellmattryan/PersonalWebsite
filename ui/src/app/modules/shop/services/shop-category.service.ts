import { Injectable } from '@angular/core';

import { ShopCategory } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ShopCategoryService {
    private activeCategory: ShopCategory;

    constructor() { }

    getActiveCategoryId(): number {
        if(!this.activeCategory) return -1;
        return this.activeCategory.id;
    }

    hasActiveCategory(): boolean {
        return (this.activeCategory !== undefined);
    }

    setActiveCategory(category: ShopCategory): void {
        this.activeCategory = category;
    }
}
