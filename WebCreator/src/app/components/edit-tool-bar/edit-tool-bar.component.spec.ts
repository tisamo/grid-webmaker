import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditToolBarComponent } from './edit-tool-bar.component';

describe('EditToolBarComponent', () => {
  let component: EditToolBarComponent;
  let fixture: ComponentFixture<EditToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditToolBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
