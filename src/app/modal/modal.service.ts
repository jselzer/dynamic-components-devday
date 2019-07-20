import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {ModalComponent} from './modal.component';

@Injectable()
export class ModalService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  public open(componentType: Type<any>): ComponentRef<any> {
    const componentRef = this.appendModalToBody();
    componentRef.instance.childComponentType = componentType;
    return componentRef;
  }

  private appendModalToBody(): ComponentRef<ModalComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return componentRef;
  }
}
