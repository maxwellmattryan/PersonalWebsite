import { Component, OnInit } from '@angular/core';

export type FaqCategory = 'documentation' | 'bugs';

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

    private categoryHidden: boolean = true;

    constructor() { }

    ngOnInit(): void { }

    public toggleCategory(category: FaqCategory): void {
        this.categoryHidden = !this.categoryHidden;

        const id = `faq__${category}`;
        this.modifyStyling(
            id,
            this.categoryHidden ? this.categoryHiddenClass : this.categoryShowClass,
            this.categoryHidden ? this.categoryShowClass : this.categoryHiddenClass
        );
    }

    public toggleAnswer(elementId: string): void {
        let faqAnswer = document.getElementById(elementId);

        let isHidden = faqAnswer.classList.contains(this.answerHiddenClass) || !faqAnswer.classList.contains(this.answerShowClass);
        this.modifyStyling(
            elementId,
            isHidden ? this.answerShowClass : this.answerHiddenClass,
            isHidden ? this.answerHiddenClass : this.answerShowClass
        );
    }

    private modifyStyling(elementId: string, addClass: string, removeClass: string): void {
        let faqInfo = document.getElementById(elementId);

        faqInfo.classList.remove(removeClass);
        faqInfo.classList.add(addClass);
    }
}
