import { Component, Input, OnInit } from "@angular/core";
import { Stock } from 'src/lib/model/stock.model';
import { StockState } from 'src/lib/state/stocks.state';

@Component({
    selector: 'stock-table',
    templateUrl: 'stock-table.html',
    styleUrls: [ 'stock-table.css' ]
})
export class StockTableComponent implements OnInit {
    symbol: string;
    stock: any;

    constructor(private stateService: StockState) {
        this.stateService.stateSubject.subscribe((state) => {
            if (state[state.active]) {
                this.stock = state[state.active]
                this.symbol = state.active;
            } else {
                this.stock = null;
            }
        });
    }

    ngOnInit() {
        let tempState: any = this.stateService.getState();
        this.stock = tempState[tempState.active];
    }

    parseDate = (dateNum: number) => new Date(dateNum).toUTCString();
}