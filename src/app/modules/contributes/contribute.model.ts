export class Contribute {
    id: Number;
    name: string;
    sum: Number;
    type: ContributeType;
    destination: string;
    conditions?: string;
    coinType: CoinType;
    gate: Number;
    
    constructor() {
        this.id = 0;
    }
}

export enum ContributeType {
    A = "A",
    B = "B",
    C = "C"
}

export enum CoinType {
    Nis = "Nis",
    Dollar = "Dollar",
    Euro = "Euro"
}

  

