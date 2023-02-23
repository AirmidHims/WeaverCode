import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeanInwardComponent } from './bean-inward.component';

describe('BeanInwardComponent', () => {
  let component: BeanInwardComponent;
  let fixture: ComponentFixture<BeanInwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeanInwardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeanInwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
