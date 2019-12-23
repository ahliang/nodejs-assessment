import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryViewComponent } from './grocery-view.component';

describe('GroceryViewComponent', () => {
  let component: GroceryViewComponent;
  let fixture: ComponentFixture<GroceryViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
