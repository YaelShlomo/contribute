import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { CoinType, Contribute, ContributeType } from '../contribute.model';
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

  contributes: Contribute[] =
    [
      { "id": 1, "name": "aaaa", "sum": 10, "contributeType": ContributeType.A, "destination": "aa", "conditions": "aaa", "coinType": CoinType.Nis, "gate": 1.1 },
      { "id": 2, "name": "bbbb", "sum": 20, "contributeType": ContributeType.B, "destination": "bb", "conditions": "bbb", "coinType": CoinType.Dollar, "gate": 2.2 },
      { "id": 3, "name": "cccc", "sum": 30, "contributeType": ContributeType.C, "destination": "cc", "conditions": "ccc", "coinType": CoinType.Euro, "gate": 3.3 },
      { "id": 4, "name": "dddd", "sum": 40, "contributeType": ContributeType.A, "destination": "dd", "conditions": "ddd", "coinType": CoinType.Nis, "gate": 4.4 },
    ];

  selectedContribute1: Contribute;
  selectedContribute2: Contribute | null;
  isDisable: boolean;

  deleteContribute(contribute: Contribute) {
    let indexToDelete = this.contributes.indexOf(contribute);
    this.contributes.splice(indexToDelete, 1);
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
    if (contributeToSave.id == 0) {
      contributeToSave.id = this.contributes.length + 1;
      this.contributes.push(contributeToSave);
    }
    else {
      let contributeToUpdate = this.contributes.filter(x => x.id == contributeToSave.id)[0];
      let index = this.contributes.indexOf(contributeToUpdate);
      this.contributes[index] = contributeToSave;
    }
  }


  showHelp() {
    alert("Do you need help?");
  }

  showAdv() {
    // alert("adv"); 
  }

  btnClick(e: any) {

  }

  search(str: string) {
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

  saveContributeToServer() {
    this._contributeService.saveContributes(this.contributes).subscribe(data => {
      if (data)
        alert("Contribute saved successfully");
      else
        alert("Contribute failed");
    },
      err => {
        alert(err);
      });
  }

  constructor(private _contributeService: ContributeService, private _acr: ActivatedRoute, public dialog: MatDialog) {

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

}

