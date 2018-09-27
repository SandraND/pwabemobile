import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TransactionsApiService } from '../../services/transactions-api.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  product: Product;
  amountColumns = ['currency', 'qty', 'amount'];
  transactionsColumns = ['currency', 'amount'];

  constructor(
    private apiService: TransactionsApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.product = this.apiService.getProduct(params.id);
    });
  }

}
