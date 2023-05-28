import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoinType, Contribute, ContributeType, MyErrorStateMatcher } from '../contribute.model';

@Component({
  selector: 'app-contribute-details-form',
  templateUrl: './contribute-details-form.component.html',
  styleUrls: ['./contribute-details-form.component.css']
})

export class ContributeDetailsFormComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.innerWidth = window.innerWidth;
  }

  private _isDisable: boolean;

  public get isDisable(): boolean {
    return this._isDisable;
  }

  @Input()
  public set isDisable(value: boolean) {
    this._isDisable = value;
    if (this._contribute != undefined) {
      this.contributeForm = new FormGroup({
        // "id": new FormControl(this._contribute.id),
        "myId": new FormControl(this._contribute.myId),
        "name": new FormControl({ value: this._contribute.name, disabled: this._isDisable }, [Validators.required, Validators.minLength(3), Validators.pattern(this.charRegex)]),
        "sum": new FormControl({ value: this._contribute.sum, disabled: this._isDisable }, [Validators.required, Validators.pattern(this.numRegex)]),
        "contributeType": new FormControl({ value: this._contribute.contributeType, disabled: this._isDisable }, Validators.required),
        "destination": new FormControl({ value: this._contribute.destination, disabled: this._isDisable }, Validators.required),
        "conditions": new FormControl({ value: this._contribute.conditions, disabled: this._isDisable }),
        "coinType": new FormControl({ value: this._contribute.coinType, disabled: this._isDisable }, Validators.required),
        "gate": new FormControl({ value: this._contribute.gate, disabled: this._isDisable }, Validators.required)
      });
    }
  }

  entityType = ContributeType;

  private _contribute: Contribute | null;

  contributeForm: FormGroup;

  numRegex = /^-?\d*[.,]?\d{0,2}$/;

  charRegex = '^[a-zA-Z\u0590-\u05FF\u200f\u200e]+$';

  public get contribute(): Contribute | null {
    return this._contribute!;
  }

  @Input()
  public set contribute(value: Contribute | null) {
    if (value != null) {
      this._contribute = value;
      if (this._contribute != undefined) {
        this.contributeForm = new FormGroup({
          // "id": new FormControl(this._contribute.id),
          "myId": new FormControl(this._contribute.myId),
          "name": new FormControl(this._contribute.name, [Validators.required, Validators.minLength(3), Validators.pattern(this.charRegex)]),
          "sum": new FormControl(this._contribute.sum, [Validators.required, Validators.pattern(this.numRegex)]),
          "contributeType": new FormControl(this._contribute.contributeType, Validators.required),
          "destination": new FormControl(this._contribute.destination, Validators.required),
          "conditions": new FormControl(this._contribute.conditions),
          "coinType": new FormControl(this._contribute.coinType, Validators.required),
          "gate": new FormControl(this._contribute.gate, Validators.required)
        });
      }
    }    
  }

  getErrorMessage(field: string): string {
    if (this.contributeForm.controls?.[field]?.errors?.['required']) {
      return 'זהו שדה חובה';
    }
    if (field == 'name' && this.contributeForm.controls?.['name']?.errors?.['pattern']) {
      return "שדה זה מכיל תווים בעברית או אנגלית בלבד ";
    }
    if (field == 'name' && this.contributeForm.controls?.['name']?.errors?.['minlength']) {
      return "שדה זה חייב להכל לפחות 3 תווים";
    }
    if (field == 'sum' && this.contributeForm.controls?.['sum']?.errors?.['pattern']) {
      return "שדה זה מכיל ספרות בלבד ";
    }
    return '';
  }

  clearContribute() {
    if (this._contribute)
    this.contributeForm = new FormGroup({
      // "id": new FormControl(this._contribute.id),
      "myId": new FormControl(this._contribute.myId),
      "name": new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(this.charRegex)]),
      "sum": new FormControl('', [Validators.required, Validators.pattern(this.numRegex)]),
      "contributeType": new FormControl('', Validators.required),
      "destination": new FormControl('', Validators.required),
      "conditions": new FormControl(''),
      "coinType": new FormControl('', Validators.required),
      "gate": new FormControl('', Validators.required)
    });
  }

  @Output()
  onSaveContribute: EventEmitter<any> = new EventEmitter();

  saveNewContribute() {
    if (this.contributeForm.valid) {
      console.log("this.contributeForm.valid");
      this.contribute = this.contributeForm.value;
      this.onSaveContribute.emit(this._contribute);
      this._contribute = null
    } 
  }

  clearNewContribute() {
    this._contribute = null
  }

  @Output()
  onFirstFocus: EventEmitter<any> = new EventEmitter();

  fistFocusEmited: boolean = false;

  inputFocus() {
    if (!this.fistFocusEmited) {
      this.fistFocusEmited = true
    }
    this.onFirstFocus.emit()
  }

  contributeTypes = Object.keys(ContributeType);
  coinTypes = Object.keys(CoinType);
}
