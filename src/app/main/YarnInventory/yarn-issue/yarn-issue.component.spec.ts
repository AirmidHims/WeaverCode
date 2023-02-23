import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnIssueComponent } from './yarn-issue.component';

describe('YarnIssueComponent', () => {
  let component: YarnIssueComponent;
  let fixture: ComponentFixture<YarnIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YarnIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YarnIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
