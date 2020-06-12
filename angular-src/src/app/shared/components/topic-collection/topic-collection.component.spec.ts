import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicCollectionComponent } from './topic-collection.component';

describe('TopicCollectionComponent', () => {
    let component: TopicCollectionComponent;
    let fixture: ComponentFixture<TopicCollectionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopicCollectionComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopicCollectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
