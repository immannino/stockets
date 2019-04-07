import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/lib/service/socket.service';
import { StockEvent, Stock } from 'src/lib/model/stock.model';
import { StockState } from 'src/lib/state/stocks.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  state: any = {};
  activeStock: string;
  title = 'sockets';
  styles = [
    'background: linear-gradient(to top left, cyan, yellow, cyan, black)',
    'font-size: 24px',
    'padding: 1em'
  ].join(';');
  isEditStocks: boolean = false;

  constructor(private service: SocketService, private stateService: StockState) {
    this.stateService.stateSubject.subscribe((state) => {
      this.state = {
        ...this.state,
        ...state
      }
    });
  }

  ngOnInit() {
    this.state = this.stateService.getState();
    this.service.initSocket();
    this.subscribeEvents();
  }
  
  isActive = (key: string) => this.activeStock === key ? true : false;
  getKeys = () => Object.keys(this.state);

  expandStockToggle() {
    this.isEditStocks = !this.isEditStocks;
  }
  
  setActive(key) {
    if (this.activeStock === key) {
      this.activeStock = null;
    } else {
      this.activeStock = key;
      this.stateService.updateState({
        ...this.state,
        active: this.activeStock.toUpperCase()
      });
    }
  }
  
  subscribeEvents() {
    this.service.subscibe(this.state.symbols);
    this.service.parseMessage();
    // this.service.onMessage().subscribe((data: StockEvent) => {
    //   this.parseStockEvent(data);
    // });
  }

  parseStockEvent(stock: StockEvent) {
    if (!this.state[stock.symbol]) {
      this.state[stock.symbol] = {
        symbol: stock.symbol,
        events: [stock]
      };
    } else {
      let tempStock = this.state[stock.symbol];
      tempStock.events.unshift(stock);
      this.state[tempStock.symbol] = {
        ...tempStock
      };
    }
    this.stateService.updateState(this.state);
  }
}
