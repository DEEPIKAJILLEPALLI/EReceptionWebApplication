import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EReception, Purpose, ToMeet } from '../models/Ereception.model';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ReceptionService } from '../services/reception.service';
import { CustomerValidator } from '../services/validator.service';

@Component({
  selector: 'app-reception-form',
  templateUrl: './reception-form.component.html',
  styleUrls: ['./reception-form.component.css']
})
export class ReceptionFormComponent implements OnInit {

  visitorFormGroup: FormGroup;
  visitor: EReception;
  purposes: Purpose[];
  tomeets: ToMeet[];
  filteredTomeet: Observable<any[]>;
  @Output() vistoradded = new EventEmitter<EReception>();
 // hour = 0; minute; second = 0;
  genders = ['Female', 'Male'];
  id: number;
  name: string;
  gender: string;
  mobile: string;
  email: string;
  purpose: string;
  address: string;
  tomeet = new FormControl();
  @Output() vis = new EventEmitter<EReception>();
  tomeetf: string;


  constructor(
    private Validator: CustomerValidator, private _formBuilder: FormBuilder) {
    this.visitorFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', this.Validator.formEmailValidator],
      gender: [''],
      tomeet: [''],
      purpose: ['', Validators.required],
      address: ['', Validators.required]

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

  ngOnInit() {
    if (this.id) {
      this.visitorFormGroup = this._formBuilder.group({
        name: [this.name, Validators.required],
        gender: [this.gender],
        mobile: [this.mobile, Validators.required],
        address: [this.address, Validators.required],
        email: [this.email, this.Validator.formEmailValidator],
        tomeet: [this.tomeet.value, Validators.required],
        purpose: [this.purpose, Validators.required]
      });
  }
  }
  onSubmit() {
    if (this.visitorFormGroup.valid) {
      this.visitor = this.visitorFormGroup.value;

      console.log(this.visitor);
      // this.hour = this.dateTime.getHours() > 12 ? (this.dateTime.getHours()) - 12 : this.dateTime.getHours();
      // this.minute = this.dateTime.getMinutes();
      // this.second = this.dateTime.getSeconds();
      // const ampm = this.dateTime.getHours() > 11 ? 'PM' : 'AM';
      // console.log(ampm);
      // this.inTime = '' + this.hour + ':' + this.minute + ' ' + ampm;
      // console.log(this.inTime);
      const inTime = this.Validator.GetCurrentTime();

      console.log(this.visitor.Gender);
      this.visitor.id = this.id;
      this.visitor.InTime = inTime;
      // this.visitor.outTime = this.OutTime;
      this.visitor.ToMeet = '' + this.tomeet.value;
      this.tomeetf = '' + this.tomeet.value;
      console.log(this.visitor.Gender);
     // console.log('outtime:' + this.visitor.outTime);
      this.vis.emit(this.visitor);
      this.vistoradded.emit(this.visitor);

    }

  }
}
