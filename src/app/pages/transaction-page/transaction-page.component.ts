import { Component, OnInit } from '@angular/core';
import { TransactionsApiService } from '../../services/transactions-api.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent implements OnInit {

  products = [];

  constructor(
    private apiService: TransactionsApiService
  ) { }

  ngOnInit() {
    this.apiService.productsChange$.subscribe((products) => {
      this.products = products;
    });

    this.apiService.loadData();
  }

}
