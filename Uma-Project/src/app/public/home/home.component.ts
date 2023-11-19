import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  stores: Store[] = []; // Declarar la propiedad 'products' como un arreglo de productos

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.getAllStores(); 
  }
  getAllStores() {
    this.storeService.getAllStores().subscribe((data: any) => {
      this.stores = data;
      console.log(this.stores);
    });
  }
}
