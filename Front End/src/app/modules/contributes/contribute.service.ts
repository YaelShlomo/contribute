import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Contribute, EmailModel } from "./contribute.model";

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

    saveContribute(contributeToSave: Contribute): Observable<boolean> {
        return this._http.post<boolean>("/api/Contributes", contributeToSave); 
    }
    updateContribute(contributeToSave: Contribute): Observable<boolean> {
        return this._http.put<boolean>("/api/Contributes/"+contributeToSave.myId, contributeToSave); 
    }

    deleteContributesFromServer(myId: Number): Observable<boolean> {
        return this._http.delete<boolean>("/api/Contributes/"+myId);
    }

    sendEmail(email: EmailModel) :Observable<boolean> {
        console.log("sendEmail")
        return this._http.post<boolean>('/api/Contributes/send', email);
      }

    constructor(private _http:HttpClient) {
    }
}

