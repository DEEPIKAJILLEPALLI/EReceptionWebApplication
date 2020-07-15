import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { EReception } from '../models/Ereception.model';
import { MatTableDataSource, MatPaginator, Sort, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ReceptionService } from '../services/reception.service';

@Component({
  selector: 'app-reception-list',
  templateUrl: './reception-list.component.html',
  styleUrls: ['./reception-list.component.css']
})
export class ReceptionListComponent implements OnInit {
  @Input()
  // tslint:disable-next-line:no-inferrable-types
  public reload: boolean = false;
  visitorList: EReception[];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['id', 'name', 'gender', 'email', 'mobile', 'address', 'purpose', 'toMeet', 'inTime', 'outTime'];

  public selectedRow$ = new BehaviorSubject<EReception>(null);
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  public onVisitorSelection = new EventEmitter<EReception>();
  sortedData;

  constructor(private vs: ReceptionService) {
    // this.data =  this.vs.getVisitorList().toPromise();
  }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    // console.log("vistorList:"+ this.vs.getVisitorList().toPromise());

    this.visitorList = await this.vs.getVisitorList().toPromise();
    console.log("li" + this.visitorList );

    
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
  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnChanges(): void {
    if (this.reload) {
      this.loadOrdersAsync();
    }
  }
  private async loadOrdersAsync() {
    this.visitorList = await this.vs.getVisitorList().toPromise();
    this.dataSource.data = this.visitorList;
  }
  public async onSelectRow(row: EReception): Promise<void> {
    this.selectedRow$.next(row);
    this.onVisitorSelection.emit(row);
    // console.log(row);
  }

}


