import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoinType, Contribute, ContributeType } from '../contribute.model';

@Component({
  selector: 'app-contribute-details-form',
  templateUrl: './contribute-details-form.component.html',
  styleUrls: ['./contribute-details-form.component.css']
})

export class ContributeDetailsFormComponent implements OnInit {

  // constructor() { }

  ngOnInit(): void {
  }

  entityType = ContributeType;

  private _contribute: Contribute;

  contributeForm: FormGroup;

  public get contribute(): Contribute {
    return this._contribute;
  }

  @Input()
  public set contribute(value: Contribute) {
    if (value != null) {
      this._contribute = value;
      if (this._contribute != undefined) {
        this.contributeForm = new FormGroup({
          "id": new FormControl(this.contribute.id),
          "name": new FormControl(this.contribute.name, [Validators.required, Validators.minLength(3)]),
          "sum": new FormControl(this._contribute.sum, Validators.required),
          "type": new FormControl(this.contribute.type, Validators.required),
          "destination": new FormControl(this.contribute.destination, Validators.required),
          "conditions": new FormControl(this.contribute.conditions),
          "coinType": new FormControl(this.contribute.coinType, Validators.required),
          "gate": new FormControl(this.contribute.gate, Validators.required)
        });
      }
    }
  }

  @Output()
  onSaveContribute: EventEmitter<any> = new EventEmitter();

  saveNewContribute() {
    // this.contribute?.name = this.contributeForm.controls["name"].value;
    // this.contribute?.sum = this.contributeForm.controls["sum"].value; 
    this.contribute = this.contributeForm.value;
    this.onSaveContribute.emit(this._contribute);
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
