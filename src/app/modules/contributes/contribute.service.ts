import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoinType, Contribute, ContributeType } from "./contribute.model";

const CONTRIBUTES = [
    { "id":1, "name":"aaaa", "sum":10, "type":ContributeType.A, "destination":"aa", "conditions":"aaa", "coinType":CoinType.Nis, "gate":1.1  },
    { "id":2, "name":"bbbb", "sum":20, "type":ContributeType.B, "destination":"bb", "conditions":"bbb", "coinType":CoinType.Dollar, "gate":2.2  },
    { "id":3, "name":"cccc", "sum":30, "type":ContributeType.C, "destination":"cc", "conditions":"ccc", "coinType":CoinType.Euro, "gate":3.3  },
    { "id":4, "name":"dddd", "sum":40, "type":ContributeType.A, "destination":"dd", "conditions":"ddd", "coinType":CoinType.Nis, "gate":4.4  },
]

@Injectable()
export class ContributeService {

    getContribute(): Contribute[] {
        return CONTRIBUTES;
    }

    getContributesSlowly(): Promise<Contribute[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(CONTRIBUTES);
            },5000)
        })

    }

    getContributesFromServer(): Observable<Contribute[]> {
          return this._http.get<Contribute[]>("/api/Contributes");
    }

    getContributesFromServerByDone(done: boolean) {
        return this._http.get<Contribute[]>("/api/Contributes/?done=" + done);
    }

    saveContributes(contributesList: Contribute[]): Observable<boolean> {
        return this._http.post<boolean>("/api/Contributes", contributesList)
    }

    getValue(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 3000);
            //reject("no number found");
        });
    }

    callFunc() {
        console.log("before call getValue")
        var x: number;
        this.getValue().then((value) => {
            x = value;
            console.log("after get value from getValue function. The value is " + x);
        }).catch((err) => {
            x = 0;
            console.log(err)
        })
        console.log("after call getValue");
    }

    constructor(private _http:HttpClient) {
        this.callFunc();
    }

}