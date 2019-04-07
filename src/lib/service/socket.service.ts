import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import * as socketIo from 'socket.io-client';
import { StockEvent } from '../model/stock.model';
import { StockState } from '../state/stocks.state';

const SERVER_URL = 'https://ws-api.iextrading.com/1.0/tops';

@Injectable()
export class SocketService {
    private socket;

    constructor(private state: StockState) {}

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    subscibe(symbols: string[]) {
        this.socket.on('connect', () => {
            this.socket.emit('subscribe', symbols.join(','));
        });
    }

    disconnect(symbols: string[]) {
        this.socket.on('disconnect', () => console.log('Disconnected.'));
        this.initSocket();
        this.subscibe(symbols);
        this.parseMessage();
    }
    public onMessage(): Observable<StockEvent> {
        return new Observable<StockEvent>(observer => {
            this.socket.on('message', (data: string) => {
                observer.next(JSON.parse(data))
            });
        });
    }

    public parseMessage() {
        this.onMessage().subscribe((data: StockEvent) => {
            this.parseStockEvent(data);
          });
    }

    private parseStockEvent(stock: StockEvent) {
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
      this.state.updateState(this.state);
    }
}