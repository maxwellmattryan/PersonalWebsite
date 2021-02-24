import { Component, OnInit } from '@angular/core';

export type FaqCategory = 'compatibility' | 'documentation' | 'bugs';

@Component({
    selector: 'ui-shop-faq-view',
    templateUrl: './shop-faq-view.component.html',
    styleUrls: ['./shop-faq-view.component.scss']
})
export class ShopFaqViewComponent implements OnInit {
    private answerShowClass: string = 'faq__category-info-q-container--show';
    private answerHiddenClass: string = 'faq__category-info-q-container--hidden';

    private categoryShowClass: string = 'faq__category-info--show';
    private categoryHiddenClass: string = 'faq__category-info--hidden';

    constructor() { }

    ngOnInit(): void { }

    public toggleCategory(category: FaqCategory, event: Event): void {
        const id = `faq__${category}`;
        const faqCategory = document.getElementById(id);
        let isHidden = this.elementContainsStyles(faqCategory, 'category');

        (<HTMLInputElement>event.target).innerHTML = isHidden ? '&#8722;' : '&#x2b;';

        this.modifyStyles(
            faqCategory,
            isHidden ? this.categoryShowClass : this.categoryHiddenClass,
            isHidden ? this.categoryHiddenClass : this.categoryShowClass
        );
    }

    public toggleAnswer(elementId: string, event: Event): void {
        let faqAnswer = document.getElementById(elementId);
        let isHidden = this.elementContainsStyles(faqAnswer, 'answer');

        (<HTMLInputElement>event.target).innerHTML = isHidden ? '&#8722;' : '&#x2b;';

        this.modifyStyles(
            faqAnswer,
            isHidden ? this.answerShowClass : this.answerHiddenClass,
            isHidden ? this.answerHiddenClass : this.answerShowClass
        );
    }

    private elementContainsStyles(elem: HTMLElement, type: 'category' | 'answer'): boolean {
        const isCategory = type == 'category';
        const showClass = isCategory ? this.categoryShowClass : this.answerShowClass;
        const hiddenClass = isCategory ? this.categoryHiddenClass : this.answerHiddenClass;

        return elem.classList.contains(hiddenClass) || !elem.classList.contains(showClass);
    }

    private modifyStyles(elem: HTMLElement, addClass: string, removeClass: string): void {
        elem.classList.remove(removeClass);
        elem.classList.add(addClass);
    }
}
