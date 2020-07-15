import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReceptionService } from '../services/reception.service';
import { EReception } from '../models/Ereception.model';
import { CustomerValidator } from '../services/validator.service';


@Component({
  selector: 'app-visitor-info',
  templateUrl: './visitor-info.component.html',
  styleUrls: ['./visitor-info.component.css']
})
export class VisitorInfoComponent implements OnInit {
  minute;
  hour: number;
  @Input()
  public visitor: EReception;
  //  @Output() logout = new EventEmitter<EReception>();
  // private dateTime ;
  constructor(private rs: ReceptionService, private Validator: CustomerValidator) {

  }
  ngOnInit() {
  }
  Logout() {
    // this.dateTime = new Date();
    // console.log(this.dateTime);
    //   this.hour = this.dateTime.getHours() > 12 ? (this.dateTime.getHours()) - 12 : this.dateTime.getHours();
    //   this.minute = this.dateTime.getMinutes();
    //   const ampm = this.dateTime.getHours() > 11 ? 'PM' : 'AM';
    //   console.log(ampm);
    //   console.log( this.visitor.outTime);
    //   const outtime = '' + this.hour + ':' + this.minute + ' ' + ampm;
    const outtime = this.Validator.GetCurrentTime();

      this.visitor.OutTime = outtime;
      this.rs.putVisitorTime(this.visitor).toPromise();
  }
  }


