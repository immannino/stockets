import { Component, Input } from "@angular/core";
import { StockState } from 'src/lib/state/stocks.state';

@Component({
    selector: 'stock-analysis',
    templateUrl: 'stock-analysis.html',
    styleUrls: [ 'stock-analysis.css' ]
})
export class StockAnalysisComponent {
    // @Input()
    symbol: string;

    state: any;
    average: number = 0;
    currentBuy: number = 0;
    currentSell: number = 0;

    reducer = (accumulator, currentValue) => accumulator + currentValue;

    constructor(private stateService: StockState) {
        this.stateService.stateSubject.subscribe((state) => {
            this.state = state[state.active];
            this.symbol = state.active;
            this.analyze();
        });
    }

    ngOnInit() {
        let tempState: any = this.stateService.getState();
        this.state = tempState[tempState.active];
        this.analyze();
    }

    analyze() {
        if (this.state) {
            this.currentBuy = this.state.events[0].bidPrice;
            this.currentSell = this.state.events[0].lastSalePrice;
            
            let nums = this.state.events.map((item) => item.lastSalePrice);
            this.average = parseFloat((nums.reduce(this.reducer) / nums.length).toFixed(2));
        }
    }
}