import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { IndexedDBService } from '../service/indexdb.service';

@Injectable()
export class StockState {
    state = {
        // symbols: ['cof', 'snap', 'fb', 'aapl', 'msft']
        symbols: ['cof', 'snap']
    };
    
    stateSubject: Subject<any> = new Subject<any>();
    constructor(private indexDb: IndexedDBService) {}

    getState() {
        return this.state;
    }

    setState(state) {
        this.state = {
            ...this.state,
            ...state
        };
    }

    updateState(state) {
        this.setState(state);
        this.stateSubject.next(this.getState());
    }
}