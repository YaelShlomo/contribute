import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoinType, Contribute, ContributeType } from '../contribute.model';
import { ContributeService } from '../contribute.service';

@Component({
  selector: 'app-contribute-list',
  templateUrl: './contribute-list.component.html',
  styleUrls: ['./contribute-list.component.css']
})
export class ContributeListComponent implements OnInit {

  contributeType = ContributeType;
  coinType = CoinType;

  contributes: Contribute[] =
    [
      { "id": 1, "name": "aaaa", "sum": 10, "type": ContributeType.A, "destination": "aa", "conditions": "aaa", "coinType": CoinType.Nis, "gate": 1.1 },
      { "id": 2, "name": "bbbb", "sum": 20, "type": ContributeType.B, "destination": "bb", "conditions": "bbb", "coinType": CoinType.Dollar, "gate": 2.2 },
      { "id": 3, "name": "cccc", "sum": 30, "type": ContributeType.C, "destination": "cc", "conditions": "ccc", "coinType": CoinType.Euro, "gate": 3.3 },
      { "id": 4, "name": "dddd", "sum": 40, "type": ContributeType.A, "destination": "dd", "conditions": "ddd", "coinType": CoinType.Nis, "gate": 4.4 },
    ];


  selectedContribute: Contribute;

  deleteContribute(contribute: Contribute) {
    let indexToDelete = this.contributes.indexOf(contribute);
    this.contributes.splice(indexToDelete, 1);
  }

  showNewContributeDetails() {
    console.log("showNewContributeDetails")
    this.selectedContribute = new Contribute();
  }

  addNewContributeToList(contributeToAdd: Contribute) {
    console.log("addNewContributeToList")
    this.contributes.push(contributeToAdd);
    //this.selectedContribute = null;
  }

  saveContributeToList(contributeToSave: Contribute) {
    console.log(JSON.stringify(contributeToSave));
    console.log("saveContributeToList");
    if (contributeToSave.id == 0) {
      contributeToSave.id = this.contributes.length + 1;
      this.contributes.push(contributeToSave);
    }
    else {
      let contributeToUpdate = this.contributes.filter(x => x.id == contributeToSave.id)[0];
      let index = this.contributes.indexOf(contributeToUpdate);
      this.contributes[index] = contributeToSave;
    }
    //this.selectedContribute.name="";
    //this.selectedContribute.description="";
    //this.selectedContribute.id=0;
    //this.selectedContribute = null;
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
    this.selectedContribute = contribute;
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

  constructor(private _contributeService: ContributeService, private _acr: ActivatedRoute) {

  }

  userId?: number;

  ngOnInit(): void {
  }


}



