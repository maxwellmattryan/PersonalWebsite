import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItchIconComponent } from './itch-icon.component';

describe('ItchIconComponent', () => {
    let component: ItchIconComponent;
    let fixture: ComponentFixture<ItchIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItchIconComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItchIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
