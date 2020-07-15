import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EReception, ToMeet, Purpose } from '../models/Ereception.model';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ReceptionService } from '../services/reception.service';
import { CustomerValidator, DateValidator } from '../services/validator.service';

@Component({
  selector: 'app-reception-form-edit',
  templateUrl: './reception-form-edit.component.html',
  styleUrls: ['./reception-form-edit.component.css']
})
export class ReceptionFormEditComponent implements OnInit {
  visitorFormGroup: FormGroup;
  visitor: EReception;
  @Output() vis = new EventEmitter<EReception>();
  dateTime = new Date();
  hour = 0; minute; second = 0;
  inTime: string;
  outTime: string;

  id: number;
  name: string;
  gender: string;
  mobile: string;
  email: string;
  purpose: string;
  address: string;
  // tomeet: string;
  tomeet = new FormControl();
  in_time: string;
  out_time: string;
  // today = Date.now();
  purposes: Purpose[];
  tomeets: ToMeet[];
  tomeetf: string;
  filteredTomeet: Observable<any[]>;

  genders = ['female', 'male'];
  private selectedgender = 'Female';

  setradio(e: string): void {

    this.selectedgender = e;

  }
  constructor(private rs: ReceptionService,
    private Validator: CustomerValidator, private dateValidator: DateValidator, private _formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.visitorFormGroup = this._formBuilder.group({
      Id: [this.id],
      name: [this.name, Validators.required],
      gender: [this.gender],
      mobile: [this.mobile, Validators.required],
      address: [this.address, Validators.required],
      email: [this.email, this.Validator.formEmailValidator],
      tomeet: [this.tomeet, Validators.required],
      purpose: [this.purpose, Validators.required]
    });
    this.purposes = [{ value: 'interview' }, { value: 'joining' }, { value: 'IT' }, { value: 'HR' },
    { value: 'Client' }, { value: 'Finance' }, { value: 'Others' }];
    this.tomeets = [{
      name: 'Aikya',
      img: 'assets/aikya.PNG'
    },
    {
      name: 'Shiva Shankar',
      img: 'assets/shiva.PNG'
    },
    {
      name: 'BalaKrishna',
      img: 'assets/bala.PNG'
    },
    {
      name: 'Yaswanth Kata',
      img: 'assets/yash.PNG'
    },
    {
      name: 'Praveen Dameera',
      img: 'assets/praveen.PNG'
    },
    {
      name: 'Prameela',
      img: 'assets/pra.PNG'
    }];

    this.filteredTomeet = this.tomeet.valueChanges
      .pipe(
        startWith(''),
        map(meet => meet ? this.filterTOmeet(meet) : this.tomeets.slice())
      );
  }
  filterTOmeet(name: string) {
    return this.tomeets.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onSubmit() {
    if (this.visitorFormGroup.valid) {
      // this.vis = this.visitorFormGroup.value;
      this.visitor = this.visitorFormGroup.value;
      console.log(this.vis);
      // this.tomeet = '' + this.tomeetf;
      // this.hour = this.dateTime.getHours() > 12 ? (this.dateTime.getHours()) - 12 : this.dateTime.getHours();
      // this.minute = this.dateTime.getMinutes().toPrecision(2);
      // this.second = this.dateTime.getSeconds();
      // const ampm = this.dateTime.getHours() > 11 ? 'PM' : 'AM';
      // console.log(ampm);
      // this.inTime = '' + this.hour + ':' + this.minute + ' ' + ampm;
     const inTime = this.Validator.GetCurrentTime();

      console.log(this.inTime);
      this.tomeetf = '' + this.tomeet.value;
      this.visitor.ToMeet = this.tomeetf;
      this.visitor.InTime = this.inTime;
      this.visitor.OutTime = this.outTime;

      this.vis.emit(this.visitor);

    }
  }

}
