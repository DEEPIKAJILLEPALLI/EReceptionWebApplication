import { Component, OnInit, ViewChild } from '@angular/core';
import { EReception } from 'src/app/models/Ereception.model';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { ReceptionService } from 'src/app/services/reception.service';
import { ReceptionFormComponent } from '../reception-form/reception-form.component';
import { ReceptionFormEditComponent } from '../reception-form-edit/reception-form-edit.component';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reception-page',
  templateUrl: './reception-page.component.html',
  styleUrls: ['./reception-page.component.css']
})
export class ReceptionPageComponent implements OnInit {
  visitorList: EReception[];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'name', 'gender', 'email', 'mobile', 'address', 'purpose', 'toMeet', 'inTime', 'outTime'];
  selectedvisitor: EReception = null;
  public selectedRow$ = new BehaviorSubject<EReception>(null);

  constructor(public dialog: MatDialog, private vs: ReceptionService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    

    this.visitorList = await this.vs.getVisitorList().toPromise();
    this.dataSource = new MatTableDataSource(this.visitorList);
    this.dataSource.data = this.visitorList;
    this.dataSource.sort = this.sort;
    console.log(this.visitorList);
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
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
      if (added) {
        dialogRef.close();
        this.loadOrdersAsync();
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openEditDialog() {
    // tslint:disable-next-line:prefer-const
    let dialogRef = this.dialog.open(ReceptionFormComponent, {
      width: '800px',
      height: '500px',
      position: { top: '200px', bottom: '50px' },
    });
debugger;
    const obj = dialogRef.componentInstance;
    obj.id = this.selectedvisitor.id;
    obj.name = this.selectedvisitor.Name;
    obj.gender = this.selectedvisitor.Gender;
    obj.email = this.selectedvisitor.Email;
    obj.mobile = this.selectedvisitor.Mobile;
    obj.address = this.selectedvisitor.Address;
    obj.purpose = this.selectedvisitor.Purpose;
    obj.tomeetf =   this.selectedvisitor.ToMeet;
    console.log( obj.visitor);
    dialogRef.componentInstance.vis.subscribe(async () => {

      const visitor = await this.vs.putVisitor(obj.id, obj.visitor).toPromise();
      if (visitor) {
        dialogRef.close();
        this.loadOrdersAsync();
      }

    });
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
    debugger;
    dialogRef.componentInstance.confirmationok.subscribe(async () => {
      const deletedContact = await this.vs.deleteVisitor(id).toPromise();
      console.log(deletedContact);
      if (deletedContact) {
        this.loadOrdersAsync();
      }
    });


  }
  public async setSelectedVisitor(reception: EReception) {
    if (reception) {
      this.selectedvisitor = reception;

    }
  }
  private async loadOrdersAsync() {
    this.visitorList = await this.vs.getVisitorList().toPromise();
    this.dataSource.data = this.visitorList;
  }
  public async onSelectRow(row: EReception): Promise<void> {
    this.selectedRow$.next(row);
   this.selectedvisitor = row;
}
}
