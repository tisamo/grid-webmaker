import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ColorPickerComponent} from './components/shared/color-picker/color-picker.component';
import {SharedModuleModule} from "./components/shared/shared-module/shared-module.module";
import {ColorButtonComponent} from './components/shared/color-picker/color-button/color-button.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {EditorComponent} from './components/editor/editor.component';
import {MenuEditorComponent} from './components/shared/custom-buttons/menu-editor/menu-editor.component';
import {MenuEditorPopupComponent} from './components/shared/custom-buttons/menu-editor/menu-editor-popup/menu-editor-popup.component';
import {MatButtonComponent} from './components/shared/custom-buttons/mat-button/mat-button.component';
import {GridsterModule} from "angular-gridster2";
import { LayoutItemDirective } from './directives/layout-item.directive';
import { CarouselComponent } from './components/shared/custom-elements/carousel/carousel.component';
import { EmailFormComponent } from './components/shared/forms/email-form/email-form.component';
import { EditToolBarComponent } from './components/edit-tool-bar/edit-tool-bar.component';
import { GridsterLayoutComponent } from './components/gridster-layout/gridster-layout.component';
import { HeightComponent } from './components/shared/forms/height/height.component';
import { ReadComponent } from './components/shared/ngxs/read/read.component';
import { CreateComponent } from './components/shared/ngxs/create/create.component';
import { EditSwitcherComponent } from './components/shared/custom-elements/edit-switcher/edit-switcher.component';
import { ProjectsComponent } from './components/shared/custom-elements/projects/projects.component';
import { ProjectsPageComponent } from './components/shared/custom-elements/projects-page/projects-page.component';
import { AddProjectComponent } from './components/shared/custom-elements/projects-page/add-project/add-project.component';
import { TextEditorComponent } from './components/shared/custom-elements/text-editor/text-editor.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SelectedProjectComponent } from './components/shared/custom-elements/projects-page/selected-project/selected-project.component';
import { AddNewMenuItemComponent } from './components/shared/custom-buttons/menu-editor/add-new-menu-item/add-new-menu-item.component';
import {MatMenuModule} from "@angular/material/menu";
import { SocialsComponent } from './components/edit-tool-bar/socials/socials.component';
import { SocialManagerComponent } from './components/edit-tool-bar/social-manager/social-manager.component';
import { SocialComponent } from './components/edit-tool-bar/social/social.component';
import {CustomFormsModule} from "ngx-custom-validators";
import { GifsComponent } from './components/edit-tool-bar/gifs/gifs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ColorButtonComponent,
    EditorComponent,
    MenuEditorComponent,
    LayoutItemDirective,
    EditToolBarComponent,
    GridsterLayoutComponent,
    ReadComponent,
    CreateComponent,
    EditSwitcherComponent,
    ProjectsComponent,
    ProjectsPageComponent,
    TextEditorComponent,
    SelectedProjectComponent,
    SocialsComponent,
    SocialManagerComponent,
    SocialComponent,
    GifsComponent,


  ],
    imports: [
        BrowserModule,
        SharedModuleModule,
       CustomFormsModule,
        AppRoutingModule,
        MatToolbarModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatCardModule,
        HttpClientModule,
        GridsterModule,
        AngularEditorModule,
        FormsModule,
        MatMenuModule,
        ReactiveFormsModule

    ],
  providers: [GridsterLayoutComponent],
  exports: [],

  bootstrap: [AppComponent]
})
export class AppModule {
}
