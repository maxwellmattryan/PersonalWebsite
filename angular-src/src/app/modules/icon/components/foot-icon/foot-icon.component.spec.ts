import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootIconComponent } from './foot-icon.component';

describe('FootIconComponent', () => {
  let component: FootIconComponent;
  let fixture: ComponentFixture<FootIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
