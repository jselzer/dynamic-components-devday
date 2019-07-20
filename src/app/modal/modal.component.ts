import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import {InsertionDirective} from './insertion.directive';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  childComponentType: Type<any>;

  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, {static: false}) // FIXME, can we do something about this
  insertionPoint: InsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  loadChildComponent(componentType: Type<any>): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    const viewContainerRef = this.insertionPoint.viewContainerRef;

    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }
}
