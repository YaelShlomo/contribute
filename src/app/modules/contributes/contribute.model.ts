
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
export class Contribute {
    id: Number;
    name: string;
    sum: Number;
    type: ContributeType;
    destination: string;
    conditions?: string;
    coinType: CoinType;
    gate: Number;
    
    constructor() {
        this.id = 0;
    }
}

export enum ContributeType {
    A = "A",
    B = "B",
    C = "C"
}

export enum CoinType {
    Nis = "Nis",
    Dollar = "Dollar",
    Euro = "Euro"
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }

  

