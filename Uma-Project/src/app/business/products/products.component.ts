import { Component, OnInit, ViewChild } from '@angular/core';

import {NgForm}  from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { Product } from 'src/app/models/product.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HttpDataService } from 'src/app/services/http-data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  productData!: Product;

  @ViewChild('productForm', {static: false})
  productForm!: NgForm;

  productDeleted = false;
  isEditMode = false;

  dataSource = new MatTableDataSource();


  displayedColumns: string[] = [
    'Producto_ID',
    'nombre',
    'imagen',
    'descripcion',
    'precio',
    'acciones'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //Nesesario importar sus modules en material.module.ts
  @ViewChild(MatSort, { static: true }) Sort!: MatSort;

  constructor(private httpDataService: HttpDataService, public dialog: MatDialog) {
    this.productData= {} as Product;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort; 
    this.getAllProducts();
  }

  getAllProducts() {
    this.httpDataService.getProducts().subscribe((response: any) => {
      this.dataSource.data = response.products;
      console.log(response);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

/**/
  onSubmit(){
    if(this.productForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('update');
        this.updateProduct();
      }else{
        console.log('create');
        this.addProduct();
      }
      this.cancelEdit();
    } else{
      console.log('valid data');
    }
  }

  cancelEdit(){
    this.isEditMode = false;
    this.productForm.resetForm();
  }


  
  editItem(element: any){
    this.productData = element;
    this.isEditMode = true;
  }

  deleteProduct(id: string){
    this.httpDataService.deleteProduct(id).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.filter((o: any)=>{
        this.getAllProducts();
        return o.id !== id ? o : false;
      })
    })
    console.log(this.dataSource.data);
  }

//Ventana Modal

openDialogDelete(product_id : string) {
  const dialogRef = this.dialog.open(DialogDeleteProduct, {
    data: { nombre :  this.productDeleted},
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log('The dialog was closed');
    this.productDeleted = result;
    if(this.productDeleted){
      this.deleteProduct(product_id);
    }
  });
}


  //add
  addProduct(){ 
    this.productData.Producto_ID = this.dataSource.data.length + 1;
    this.httpDataService.createProduct(this.productData).subscribe((response: any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        this.getAllProducts();
        return o;
      })
    })
  }

  //update
  updateProduct(){
    this.httpDataService.updateProduct(this.productData.Producto_ID, this.productData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        if(o.id === response.id){
          o = response;
        }
        this.getAllProducts();
        return o;
      })
    })
  }

}

@Component({
  selector: 'dialog-delete-prodcut',
  templateUrl: './dialogs/dialog-delete-product.html',
  styleUrls: ['./dialogs/dialog-delete-product.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
})
export class DialogDeleteProduct {
  constructor(public dialogRef: MatDialogRef<DialogDeleteProduct>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}