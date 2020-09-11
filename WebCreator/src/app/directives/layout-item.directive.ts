import {
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef
} from '@angular/core';
import {HeaderComponent} from "../components/header/header.component";
import {CarouselComponent} from "../components/shared/custom-elements/carousel/carousel.component";
import {EmailFormComponent} from "../components/shared/forms/email-form/email-form.component";
import {EditSwitcherComponent} from "../components/shared/custom-elements/edit-switcher/edit-switcher.component";
import {ProjectsComponent} from "../components/shared/custom-elements/projects/projects.component";
import {SocialComponent} from "../components/edit-tool-bar/social/social.component";
import {GifsComponent} from "../components/edit-tool-bar/gifs/gifs.component";


@Directive({
  selector: '[appLayoutItem]'
})
export class LayoutItemDirective implements OnChanges {
  @Input() componentRef: string;
  @Input() input: string;
  component: ComponentRef<any>;
  components = {
    header: HeaderComponent,
    email: EmailFormComponent,
    editSwticher: EditSwitcherComponent,
    projects: ProjectsComponent,
    social: SocialComponent,
    gifs: GifsComponent
  };

  constructor(
    private container: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {
  }

  ngOnChanges(): void {
    const component = this.components[this.componentRef];

    if (component) {
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory);
      this.component.instance.social = this.input;
    }
  }
}
