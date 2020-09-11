import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

import {MatIconModule} from "@angular/material/icon";
import {ColorPickerComponent} from "../color-picker/color-picker.component";
import {MenuEditorPopupComponent} from "../custom-buttons/menu-editor/menu-editor-popup/menu-editor-popup.component";
import {AppModule} from "../../../app.module";
import {MatButtonModule} from "@angular/material/button";
import {MatButtonComponent} from "../custom-buttons/mat-button/mat-button.component";
import {MatCardModule} from "@angular/material/card";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import {CarouselComponent} from "../custom-elements/carousel/carousel.component";
import {EmailFormComponent} from "../forms/email-form/email-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {HeightComponent} from "../forms/height/height.component";
import {LayoutItemDirective} from "../../../directives/layout-item.directive";
import {AddProjectComponent} from "../custom-elements/projects-page/add-project/add-project.component";
import {AddNewMenuItemComponent} from "../custom-buttons/menu-editor/add-new-menu-item/add-new-menu-item.component";
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    ColorPickerComponent,
    MenuEditorPopupComponent,
    MatButtonComponent,
    CarouselComponent, EmailFormComponent,
    HeightComponent,
    AddProjectComponent,
    AddNewMenuItemComponent,

  ],
  imports: [
    MatDialogModule,
    MatCardModule,
    MatCarouselModule.forRoot(),
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,




  ],
  entryComponents: [
    ColorPickerComponent,
    MenuEditorPopupComponent,
    HeightComponent,
    AddProjectComponent,
    AddNewMenuItemComponent
  ],
  providers: [
    LayoutItemDirective,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ]
})
export class SharedModuleModule {
}
