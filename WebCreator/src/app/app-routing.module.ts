import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditorComponent} from "./components/editor/editor.component";
import {EmailFormComponent} from "./components/shared/forms/email-form/email-form.component";
import {GridsterLayoutComponent} from "./components/gridster-layout/gridster-layout.component";
import {ProjectsPageComponent} from "./components/shared/custom-elements/projects-page/projects-page.component";
import {TextEditorComponent} from "./components/shared/custom-elements/text-editor/text-editor.component";
import {SelectedProjectComponent} from "./components/shared/custom-elements/projects-page/selected-project/selected-project.component";


export const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: EditorComponent},
  {path: 'email', component: EmailFormComponent},
  {path: 'grid', component: GridsterLayoutComponent},
  {path: 'projects', component: ProjectsPageComponent},
  {path: 'projects/:id', component: SelectedProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
