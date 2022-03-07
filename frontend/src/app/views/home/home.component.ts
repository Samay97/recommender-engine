import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/dto';
import { ProductService } from '../../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  product: Observable<Product>;

  constructor(private productService: ProductService) {
      this.product = this.productService.getProduct();
  }

  ngOnInit(): void {
  }

}
