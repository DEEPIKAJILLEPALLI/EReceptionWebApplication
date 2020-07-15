import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ReceptionFormComponent } from '../reception-form/reception-form.component';
import { MatDialog } from '@angular/material';
import { ReceptionFormEditComponent } from '../reception-form-edit/reception-form-edit.component';
import { EReception } from '../models/Ereception.model';
import { BehaviorSubject } from 'rxjs';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { DatePipe } from '@angular/common';
import { ReceptionService } from '../services/reception.service';

@Component({
  selector: 'app-reception-view',
  templateUrl: './reception-view.component.html',
  styleUrls: ['./reception-view.component.css'],
})
export class ReceptionViewComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  reloadVisitors: boolean = false;
  selectedvisitor: EReception = null;
  // vistorlistds = new MatTableDataSource<EReception>();
  constructor(public dialog: MatDialog, public vs: ReceptionService) {
    const datePipe = new DatePipe('en-US');
    console.log(datePipe);
  }
  ngOnInit() {
  }
  openFormDialog() {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(ReceptionFormComponent, {
      width: '500px',
      height: '500px',
      position: { top: '200px', bottom: '50px' },
    });
    const obj = dialogRef.componentInstance;
    const addedvisitor = dialogRef.componentInstance.vistoradded.subscribe(async () => {

      const added = await this.vs.postVisitor(obj.visitor).toPromise();
      console.log('added');
      // console.log(added);
      if (added) {
        dialogRef.close();
        this.reloadVisitors = true;
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openEditDialog() {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(ReceptionFormEditComponent, {
      width: '800px',
      height: '500px',
      position: { top: '200px', bottom: '50px' },
    });
    // console.log('edit');
    // console.log(this.selectedvisitor);
    const obj = dialogRef.componentInstance;
    obj.id = this.selectedvisitor.id;
    obj.name = this.selectedvisitor.Name;
    obj.gender = this.selectedvisitor.Gender;
    obj.email = this.selectedvisitor.Email;
    obj.mobile = this.selectedvisitor.Mobile;
    obj.address = this.selectedvisitor.Address;
    obj.purpose = this.selectedvisitor.Purpose;
    obj.tomeetf =   this.selectedvisitor.ToMeet;
    // console.log('obj');
    dialogRef.componentInstance.vis.subscribe(async () => {

      const visitor = await this.vs.putVisitor(obj.id, obj.visitor).toPromise();
      if (visitor) {
        dialogRef.close();
        this.reloadVisitors = true;
      }

    });
    // const putvisitor = this.vs.putVisitor(obj.visitor.id, obj.visitor).toPromise();      
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  async openDeleteDialog() {
    console.log(event);

    const id = this.selectedvisitor.id;
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.componentInstance.confirmationok.subscribe(async () => {
      const deletedContact = await this.vs.deleteVisitor(id).toPromise();
      console.log(deletedContact);
      if (deletedContact) {
        // dialogRef.close();
        this.reloadVisitors = true;
      }
    });


  }
  public async setSelectedVisitor(reception: EReception) {
    if (reception) {
      this.selectedvisitor = reception;
      // console.log('view' + this.vistorlistds.data);
      // console.log(this.selectedvisitor);

    }
  }




}
