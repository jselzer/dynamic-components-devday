import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef, Inject,
  OnDestroy,
  Type,
  ViewChild
} from '@angular/core';
import {InsertionDirective} from './insertion.directive';

export enum ModalStyle {DIALOG, SLIDE_PANEL};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  childComponentType: Type<any>;

  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, {static: false})
  insertionPoint: InsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              @Inject("modalStyle") private modalStyle: ModalStyle) {

  }

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

  getModalStyleClass(): object {
    return {modal: this.modalStyle === ModalStyle.DIALOG, slidepanel: this.modalStyle === ModalStyle.SLIDE_PANEL};
  }
}
