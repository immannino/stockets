import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SocketService } from 'src/lib/service/socket.service';
import { StockComponent } from './stock/stock.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { StockState } from 'src/lib/state/stocks.state';
import { StockAnalysisComponent } from './stock-analysis/stock-analysis.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { StockService } from 'src/lib/service/stock.service';
import { IndexedDBService } from 'src/lib/service/indexdb.service';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent,
    StockTableComponent,
    StockAnalysisComponent,
    ErrorComponent,
    // ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    SocketService, 
    StockState, 
    StockService, 
    IndexedDBService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
