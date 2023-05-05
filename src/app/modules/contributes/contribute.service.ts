import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoinType, Contribute, ContributeType } from "./contribute.model";

@Injectable()
export class ContributeService {

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
        // console.log("before call getValue")
        var x: number;
        this.getValue().then((value) => {
            x = value;
            // console.log("after get value from getValue function. The value is " + x);
        }).catch((err) => {
            x = 0;
            console.log(err)
        })
        // console.log("after call getValue");
    }

    constructor(private _http:HttpClient) {
        this.callFunc();
    }

}