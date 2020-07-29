import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveIconComponent } from './drive-icon.component';

describe('DriveIconComponent', () => {
    let component: DriveIconComponent;
    let fixture: ComponentFixture<DriveIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DriveIconComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DriveIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
