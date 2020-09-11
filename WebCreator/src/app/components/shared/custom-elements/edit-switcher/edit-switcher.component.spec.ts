import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSwitcherComponent } from './edit-switcher.component';

describe('EditSwitcherComponent', () => {
  let component: EditSwitcherComponent;
  let fixture: ComponentFixture<EditSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
