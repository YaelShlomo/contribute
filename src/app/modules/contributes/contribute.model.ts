
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
    A = "A",
    B = "B",
    C = "C"
}

export enum CoinType {
    Nis = "₪",
    Dollar = "$",
    Euro = "€"
}


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

  

