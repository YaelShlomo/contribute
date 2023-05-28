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
  contributes: Contribute[];
  selectedContribute1: Contribute;
  selectedContribute2: Contribute | null;
  isDisable: boolean;
  contributesCounter: number = 0;

  deleteContribute(contribute: Contribute) {
    let indexToDelete = this.contributes.indexOf(contribute);
    this.contributes.splice(indexToDelete, 1);
    let myId = contribute.myId;
    console.log(myId);
    this._contributeService.deleteContributesFromServer(myId).subscribe(data=>{
      
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
    if (contributeToSave.myId == 0) {
      this.contributesCounter += 1;
      contributeToSave.myId = this.contributesCounter;
      this.contributes.push(contributeToSave);
      this._contributeService.saveContributes(contributeToSave).subscribe(data=>{
        alert("jj")
      })

      // this._contributeService.saveContributes(this.contributes);

    }
    else {
      let contributeToUpdate = this.contributes.filter(x => x.myId == contributeToSave.myId)[0];
      let index = this.contributes.indexOf(contributeToUpdate);
      this.contributes[index] = contributeToSave;
    }
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

  // saveContributeToServer() {
  //   this._contributeService.saveContributes(this.contributes).subscribe(data => {
  //     if (data)
  //       alert("Contribute saved successfully");
  //     else
  //       alert("Contribute failed");
  //   },
  //     err => {
  //       alert(err);
  //     });
  // }

  constructor(private _contributeService: ContributeService, private _acr: ActivatedRoute, public dialog: MatDialog) {
    _contributeService.getContributesFromServer().subscribe(contributesList => {
      this.contributes = contributesList;
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

}

