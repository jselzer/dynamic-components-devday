import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  InjectionToken,
  OnDestroy,
  OnInit,
  Type,
  ViewChild
} from '@angular/core';
import {InsertionDirective} from './insertion.directive';

export enum ModalStyle {DIALOG, SLIDE_PANEL}

export const MODAL_STYLE_TOKEN = new InjectionToken<ModalStyle>("ModalStyle");

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  childComponentType: Type<any>;

  componentRef: ComponentRef<any>;

  @ViewChild(InsertionDirective, {static: true})
  insertionPoint: InsertionDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private cd: ChangeDetectorRef,
              @Inject(MODAL_STYLE_TOKEN) private modalStyle: ModalStyle) {

  }

  ngOnInit(): void {
    this.loadChildComponent(this.childComponentType);
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
