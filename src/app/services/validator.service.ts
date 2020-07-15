import { Injectable } from '@angular/core';
// import { retry } from 'rxjs/operators/retry';
import { ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms/src/model';

@Injectable()
export class CustomerValidator {
    private filedRequired = 'lbl.field_required';
    private validEmailRequired = 'lbl.valid_email_required';
    private validPhoneNORequired = 'lbl.valid_email_required';
    private dateTime ;
    public validateEmail(email) {
        const rex = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
        return rex.test(email);
    }

    public  GetCurrentTime() {
        this.dateTime = new Date();
        const hour = this.dateTime.getHours() > 12 ? (this.dateTime.getHours()) - 12 : this.dateTime.getHours();
        const minute = this.dateTime.getMinutes();
        const second = this.dateTime.getSeconds();
        const ampm = this.dateTime.getHours() > 11 ? 'PM' : 'AM';
        console.log(ampm);
        const Time = '' + hour + ':' + minute + ' ' + ampm;
        return  Time;
    }
    public validatePhoneNumber: ValidatorFn = (c: FormControl) => {
        if (c.value) {
            const isValid = /^[9]+([0-9]+)*[0-9]{9}/;
             if (isValid) {
                return null;
            } else {
                return { 'PhoneNoErr': this.validPhoneNORequired };
            }
        } else {
            return { 'PhoneNoErr': this.filedRequired };
        }
    }

    public formEmailValidator: ValidatorFn = (c: FormControl) => {
        if (c.value) {
            const isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(c.value);
            if (isValid) {
                return null;
            } else {
                return { 'emailError': this.validEmailRequired };
            }
        } else {
            return { 'emailError': this.filedRequired };
        }
    }

    private isValidEmailFormat(value: string): boolean {
        if (value) {
            const isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(value);
            if (isValid) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public formRecipientsValodator: ValidatorFn = (c: FormControl) => {
        if (c.value) {
            let isValid = true;
            let val = c.value.trim();
            if (val.length - 1 === val.lastIndexOf(';')) {
                val = val.substr(0, val.length - 1);
            }
            val.split(';').forEach((email) => {
                if (!this.isValidEmailFormat(email.trim())) {
                    isValid = false;
                }
            });

            if (!isValid) {
                return { 'emailError': this.validEmailRequired };
            }
        } else {
            return { 'emailError': this.filedRequired };
        }
    }

    public formOptionalRecipientsValodator: ValidatorFn = (c: FormControl) => {
        if (c.value) {
            let isValid = true;
            c.value.split(';').forEach((email) => {
                if (email.trim() && !this.isValidEmailFormat(email.trim())) {
                    isValid = false;
                }
            });

            if (!isValid) {
                return { 'emailError': this.validEmailRequired };
            }
        } else {
            return null;
        }
    }

    public validateFormRequiredInput: ValidatorFn = (c: FormControl) => {
        if (!c.value) {
            return { 'emailError': this.filedRequired };
        }
    }
    public isValidFormat: ValidatorFn = (c: FormControl) => {
        if (c.value) {
            const  isValid = /^[_A-Z]+([_a-zA-Z]+)*[a-zA-Z]+([a-zA-Z]+)*([a-zA-Z]{3,15})$/.test(c.value);
            if (isValid) {
                return null;
            } else {
                return { 'emailError': this.validEmailRequired };
            }
        } else {
            return { 'emailError': this.filedRequired };
        }
    }
}



@Injectable()
export class DateValidator {
    public isStringInDDMMYYYYFormat(date: string) {

        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) {
            return false;
        }

        // Parse the date parts to integers
        const parts = date.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);

        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month === 0 || month > 12) {
            return false;
        }

        const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            monthLength[1] = 29;
        }

        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    }
}
