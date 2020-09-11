import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuEditorPopupComponent } from './menu-editor-popup.component';

describe('MenuEditorPopupComponent', () => {
  let component: MenuEditorPopupComponent;
  let fixture: ComponentFixture<MenuEditorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuEditorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuEditorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
