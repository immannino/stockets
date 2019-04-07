export class StockEvent {
    symbol: string;
    sector: string;
    securityType: string;
    bidPrice: number;
    bidSize: number;
    askPrice: number;
    askSize: number;
    lastUpdated: number;
    lastSalePrice: number;
    lastSaleTime: number;
    volume: number;
    marketPercent: number;
    seq: number;
}

export class Stock {
    symbol: string;
    events: StockEvent[];
}