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

    getContributesFromServerByMyId(myId: Number) {
        return this._http.get<Contribute[]>("/api/Contributes/?myId=" + myId);
    }

    // saveContributes(contributesList: Contribute[]): Observable<boolean> {
    //     return this._http.post<boolean>("/api/Contributes", contributesList)
    // }

    saveContributes(contributeToSave: Contribute): Observable<boolean> {
        console.log("saveContributes")
        return this._http.post<boolean>("/api/Contributes", contributeToSave)
    }


    deleteContributesFromServer(myId: Number): Observable<boolean> {
        console.log("deleteContributesFromServer");
        console.log(myId);
        return this._http.delete<boolean>("/api/Contributes/?myId=" + myId);
    }

    constructor(private _http:HttpClient) {
    }

}