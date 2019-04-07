import { Component, Input, HostListener } from "@angular/core";
import { StockState } from 'src/lib/state/stocks.state';
import { SocketService } from 'src/lib/service/socket.service';
import { StockService } from 'src/lib/service/stock.service';
import { map, catchError } from 'rxjs/operators';
import { ErrorText } from '../error/error.model';

@Component({
    selector: 'stock',
    templateUrl: 'stock.html',
    styleUrls: [ 'stock.css' ]
})
export class StockComponent {
    symbols: string[];
    tempSymbol: string;
    isInvalid: boolean = false;
    errorText: ErrorText = {
        title: 'Whoops.',
        description: 'Could not find that stock symbol',
        action: 'Please try a new symbol'
    }

    constructor(private stockState: StockState, private socketService: SocketService, private stockService: StockService) {
        this.stockState.stateSubject.subscribe((state) => {
            this.symbols = state.symbols;
        });
    }
    ngOnInit() {
        let tempState: any = this.stockState.getState();
        this.symbols = tempState.symbols;
    }

    @HostListener('document:keyup', ['$event'])
    userEnter(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            this.addStockSymbol();
        }
    }
    removeStockSymbol(index) {
        let symbol = this.symbols[index];
        this.symbols.splice(index, 1);
        this.stockState.updateState({
            symbols: this.symbols
        });

        this.socketService.disconnect(this.symbols);
    }

    addStockSymbol() {
        if (!this.symbols.includes(this.tempSymbol)) {
            this.stockService.isValidSymbol(this.tempSymbol).subscribe((data) => {
                this.symbols.push(this.tempSymbol);
                this.stockState.updateState({
                    symbols: this.symbols
                });
    
                this.socketService.disconnect(this.symbols);
                this.tempSymbol = null;
                this.isInvalid = false;
            }, (error) => {
                this.isInvalid = true;
            });
        }
    }
}