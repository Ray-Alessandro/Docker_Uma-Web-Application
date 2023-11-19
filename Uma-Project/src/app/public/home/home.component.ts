import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/services/http-data.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = []; // Declarar la propiedad 'products' como un arreglo de productos

  constructor(private httpDataService: HttpDataService) {}

  ngOnInit(): void {
    // this.getAllProducts();
  }

  // getAllProducts() {
  //   this..getProducts().subscribe((response: any) => {
  //     this.products = response.products;
  //   });
  // }
}
