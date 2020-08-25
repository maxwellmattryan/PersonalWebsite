import { Component, OnInit } from '@angular/core';

import { Homepage } from '@app/shared/interfaces';
import { ApiService } from '@app/core/http';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
    isLoaded: boolean = false;

    homepage: Homepage;

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit(): void {
        this.apiService.getHomepage().subscribe(homepage => {
            console.log(homepage);

            // this.homepage = homepage;
            // this.isLoaded = true;
        });
    }
}
