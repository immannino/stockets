import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
@Injectable()
export class StockService {
    constructor(private http: HttpClient) {}

    isValidSymbol(symbol) {
        return this.http.jsonp(`https://api.iextrading.com/1.0/stock/${symbol}/company`, 'callback').pipe(
            tap(
                error => null
            )
        );
    }
}