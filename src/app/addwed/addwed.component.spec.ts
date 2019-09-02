import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddwedComponent } from './addwed.component';

describe('AddwedComponent', () => {
  let component: AddwedComponent;
  let fixture: ComponentFixture<AddwedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddwedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
