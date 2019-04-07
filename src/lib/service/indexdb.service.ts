import { Injectable } from "@angular/core";
import Dexie from 'dexie';
import { Subject } from 'rxjs';

@Injectable()
export class IndexedDBService extends Dexie {
    tableSubject: Subject<any> = new Subject();
    constructor() {
        super("Stockdb");
        this.init();
    }

    add(state) {
        return new Promise((resolve, reject) => {
            let stocks = this.table('stocks');
            stocks.put({
                state: String(state)
            });
            resolve();
        });
    }

    getTableData(tableName: string) {
        let stuff = this.table(tableName);
        stuff.toArray().then((data) => {
            this.tableSubject.next(data);
        }); 
    }

    reset() {
        this.delete().then(() => {
            this.init();
        });
    }

    init() {
        this.version(1).stores({
            stocks: "++id, state"
        });
        
        this.open();
    }

    addNewTable(stock: string) {
        this.version(1).stores({
            stock: "symbol, "
        })
    }
}