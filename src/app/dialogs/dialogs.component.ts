import { Component, Inject, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoaderDialogComponent } from '../dialogs/loader-dialog/loader-dialog.component';
import { BasicDialogComponent } from './basic-dialog/basic-dialog.component';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';

@Component({
  selector: 'notebook-dialog',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicDialogTemplate', { read: ViewContainerRef }) ViewContainerRef;

  componentRef: ComponentRef<any>;

  constructor(
    private dialogRef: MatDialogRef<DialogsComponent>,
    private resolver: ComponentFactoryResolver,
    private vcRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public changeConfirmed(taskStatus?): void {
    taskStatus ? this.dialogRef.close({ manualTaskStatus: taskStatus, response: 'YES' }) : this.dialogRef.close('YES');
  }

  public changeReversed(): void {
    this.dialogRef.close('NO');
  }

  public ngOnInit() {
    // checking the component type to load and loading
    switch (this.data.component) {
      case 'BasicComponent':
        this.loadDynamicDialog(BasicDialogComponent);
        break;
      case 'LoaderComponent':
        this.loadDynamicDialog(LoaderDialogComponent);
        break;
      case 'CoursesComponent':
        this.loadDynamicDialog(CoursesDialogComponent);
        break  
    }
  }

  private loadDynamicDialog(relevantComponent: any) {
    // assigning the component to be loaded.
    const componentToLoad = this.resolver.resolveComponentFactory(relevantComponent);
    // creating the instance of the component to be loaded
    this.componentRef = this.vcRef.createComponent(componentToLoad);
    // assigning an instance of the data to be passed on to the loaded component
    this.componentRef.instance.data = this.data;
    // subscribing to the event handlers in the loaded component.
    // this.componentRef.instance.buttonClicked.subscribe((event: any) => {
    //   switch (event.component) {
    //     case 'BasicComponent':
    //       if (event.emitValue === 'YES') {
    //         this.changeConfirmed();
    //       } else if (event.emitValue === 'NO') {
    //         this.changeReversed();
    //       }
    //       break;
    //     case 'LoaderComponent':
    //       this.changeConfirmed(event.emitValue);
    //       break;
    //   }
    // });
  }

  public ngOnDestroy() {
    // unloading the component on dialog exit
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
