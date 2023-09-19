
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class Contribute {
    // id: String;
    myId: Number;
    name: string;
    sum: Number;
    contributeType: ContributeType;
    destination: string;
    conditions?: string;
    coinType: CoinType;
    gate: Number;
    
    constructor() {
        this.myId = 0;
    }
}

export enum ContributeType {
    A = 1,
    B = 2,
    C = 3
}

export enum CoinType {
    "₪" = 1,
    "$" = 2,
    "€" = 3
}

export class EmailModel {
    recipient: string;
    subject: string;
    body: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

  
