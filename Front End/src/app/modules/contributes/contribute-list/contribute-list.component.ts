import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { CoinType, Contribute, ContributeType, EmailModel } from '../contribute.model';
import { ContributeService } from '../contribute.service';
import { DeleteContributeModalComponent } from '../delete-contribute-modal/delete-contribute-modal.component';

@Component({
  selector: 'app-contribute-list',
  templateUrl: './contribute-list.component.html',
  styleUrls: ['./contribute-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContributeListComponent implements OnInit {

  contributeType = ContributeType;
  coinType = CoinType;
  contributes: Contribute[];
  selectedContribute1: Contribute;
  selectedContribute2: Contribute | null;
  isDisable: boolean;
  contributesCounter: number;

  deleteContribute(contribute: Contribute) {
    let indexToDelete = this.contributes.indexOf(contribute);
    this.contributes.splice(indexToDelete, 1);
    let myId = contribute.myId;
    console.log(myId);
    this._contributeService.deleteContributesFromServer(myId).subscribe(data=>{
      console.log(data);
    });
  }

  showNewContributeDetails() {
    this.selectedContribute1 = new Contribute();
  }

  addNewContributeToList(contributeToAdd: Contribute) {
    console.log("addNewContributeToList")
    this.contributes.push(contributeToAdd);
  }

  saveContributeToList(contributeToSave: Contribute) {
    console.log(JSON.stringify(contributeToSave));
    let contributeToSaveInCorrectFormat = new Contribute();
    contributeToSaveInCorrectFormat.myId = contributeToSave.myId;
    contributeToSaveInCorrectFormat.name = contributeToSave.name;
    contributeToSaveInCorrectFormat.sum = Number(contributeToSave.sum);
    contributeToSaveInCorrectFormat.contributeType = Number(ContributeType[contributeToSave.contributeType])
    contributeToSave.contributeType = Number(ContributeType[contributeToSave.contributeType])
    contributeToSaveInCorrectFormat.destination = contributeToSave.destination;
    contributeToSaveInCorrectFormat.conditions = contributeToSave.conditions;
    contributeToSaveInCorrectFormat.coinType = Number(CoinType[contributeToSave.coinType]);
    contributeToSaveInCorrectFormat.gate = Number(contributeToSave.gate);

    if (contributeToSave.myId == 0) {
      this.contributesCounter += 1;
      contributeToSave.myId = this.contributesCounter;
      contributeToSaveInCorrectFormat.myId = contributeToSave.myId;
      this.contributes.push(contributeToSave);
      this._contributeService.saveContribute(contributeToSaveInCorrectFormat).subscribe(data=>{
      })
    }
    else {
      let contributeToUpdate = this.contributes.filter(x => x.myId == contributeToSave.myId)[0];
      let index = this.contributes.indexOf(contributeToUpdate);
      this.contributes[index] = contributeToSave;
      this._contributeService.updateContribute(contributeToSaveInCorrectFormat).subscribe(data=>{
      })
    }
    let emailDetails = new EmailModel()
    emailDetails.recipient = "yaelfrank100@gmail.com";
    emailDetails.body = "Email Body";
    emailDetails.subject = "A Contribution in excess of 10000 was received"
    console.log(emailDetails)
    this._contributeService.sendEmail(emailDetails).subscribe( data => {})
  }

  showDetails(contribute: Contribute) {
    this.selectedContribute2 = contribute;
    this.isDisable = true;
  }

  editDetails(contribute: Contribute) {
    this.selectedContribute2 = contribute;
    this.isDisable = false;
  }

  showContributesByDone(done: boolean) {
    this._contributeService.getContributesFromServerByDone(done).subscribe(data => {
      this.contributes = data;
    })
  }

  constructor(private _contributeService: ContributeService, private _acr: ActivatedRoute, public dialog: MatDialog) {
        _contributeService.getContributesFromServer().subscribe(contributesList => {
          this.contributes = contributesList;
          this.contributesCounter = this.contributes.length;
    })
 }

  userId?: number;

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(DeleteContributeModalComponent, {
      width: '250px',
    });
  }

  expandPanel(matExpansionPanel: MatExpansionPanel, event: any) {
    event.stopPropagation();
    if (!this._isExpansionIndicator(event.target)) {
      matExpansionPanel.open();
    }
  }

  private _isExpansionIndicator(target: EventTarget | any): boolean {
    const expansionIndicatorClass = "mat-expansion-indicator";
    return (
      target.classList && target.classList.contains(expansionIndicatorClass)
    );
  }

  getKeyByValue(enumObj: any, value:any) {
    for (const key in enumObj) {
      if (enumObj[key] === value) {
        if (typeof enumObj[key] === "number") {
          return key;
        }
        else {
          return enumObj[key];
        }
      }
    }
    return null; // Value not found in the enum
  }

}

