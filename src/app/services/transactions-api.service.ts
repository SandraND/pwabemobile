import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsApiService {

  private options = {
    withCredentials: false
  };

  private rates = [];
  private products = [];
  private transactions = [];
  private productsChange: Subject<any> = new Subject();

  productsChange$: Observable<any> = this.productsChange.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

  getRates() {
    this.httpClient.get(environment.currencyURL, this.options).toPromise()
      .then((data: any) => {
        this.rates = data;
        localStorage.removeItem('Rates');
        localStorage.setItem('Rates', JSON.stringify(this.rates));
      })
      .catch(err => {
        console.log(err);
      });
  }


  getTransactions() {
    if (this.transactions.length !== 0) {
      this.loadProducts();
    } else {
      this.httpClient.get(environment.transactionURL, this.options).toPromise()
        .then((data: any) => {
          this.transactions = data;
          localStorage.removeItem('Transactions');
          localStorage.setItem('Transactions', JSON.stringify(this.transactions));
          this.loadProducts();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  loadProducts() {
    this.products = [];
    this.transactions.forEach(transaction => {
      const prdcts = this.products.find((prod) => {
        return prod.name === transaction.sku;
      });

      if (prdcts) {
        prdcts.addTransaction({ amount: transaction.amount, currency: transaction.currency }, this.rates);
      } else {
        const product = new Product(transaction.sku);
        product.addTransaction({ amount: transaction.amount, currency: transaction.currency }, this.rates);
        this.products.push(product);
      }
    });

    localStorage.removeItem('Products');
    localStorage.setItem('Products', JSON.stringify(this.products));
    this.productsChange.next(this.products);
  }

  getProduct(name) {
    this.refresh();

    const prdct = this.products.find((prod) => {
      return prod.name === name;
    });

    return prdct;
  }

  private refresh() {
    this.rates = JSON.parse(localStorage.getItem('Rates'));
    this.transactions = JSON.parse(localStorage.getItem('Transactions'));
    this.products = JSON.parse(localStorage.getItem('Products'));
  }

  loadData() {
    this.getRates();
    this.getTransactions();
  }
}
