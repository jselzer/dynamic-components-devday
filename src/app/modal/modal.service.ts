import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {ModalComponent} from './modal.component';
import {ModalConfig} from './modal.config';
import {ModalInjector} from './modal.injector';

@Injectable()
export class ModalService {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  public open(componentType: Type<any>, config: ModalConfig): ComponentRef<any> {
    const componentRef = this.appendModalToBody(config);
    componentRef.instance.childComponentType = componentType;
    return componentRef;
  }

  private appendModalToBody(config: ModalConfig): ComponentRef<ModalComponent> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const componentRef = componentFactory.create(this.createModalInjector(config));
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return componentRef;
  }

  private createModalInjector(config: ModalConfig): Injector {
    const map = new WeakMap();
    map.set(ModalConfig, config);

    return Injector.create({
        providers: [{provide: ModalConfig, useValue: config}],
        parent: this.injector
      });
  }
}
