import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparelComponent } from './apparel.component';

describe('ApparelComponent', () => {
  let component: ApparelComponent;
  let fixture: ComponentFixture<ApparelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApparelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApparelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
