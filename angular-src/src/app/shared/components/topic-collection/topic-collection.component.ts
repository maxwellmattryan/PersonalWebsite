import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '@app/shared/models';

@Component({
    selector: 'app-topic-collection',
    templateUrl: './topic-collection.component.html',
    styleUrls: ['./topic-collection.component.scss']
})
export class TopicCollectionComponent implements OnInit {
    @Input() topics: Array<Topic>;

    constructor() { }

    ngOnInit(): void { }
}