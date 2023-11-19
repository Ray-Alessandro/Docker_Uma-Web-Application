import { Component, OnInit, ViewChild } from '@angular/core';

import {NgForm}  from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { User } from 'src/app/models/user.model';
import {MatDialog, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';


import { HttpDataService } from 'src/app/services/http-data.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent {
  userData: User = {
    _id: null,
    nombres: null,
    apellidos: null,
    telefono: null,
    credencial: {
      correo: '',
      password: ''
    },
    localidad: {
      direccion: null,
      pais: null,
      ciudad: null
    }
  };
  //userCreated = false;
  userDeleted = false;

  isEditMode = false;

  @ViewChild('userForm', {static: false})
  userForm!: NgForm;


  onSubmit(){
    if(this.userForm.form.valid){
      console.log('valid');
      if(this.isEditMode){
        console.log('update');
        this.updateUser();
      }else{
        console.log('create');
        this.addUser();
      }
      this.cancelEdit();
    } else{
      console.log('invalid data');
    }
  }

  cancelEdit(){
    this.isEditMode = false;
    this.userForm.resetForm();
    this.getAllUsers();
  }
  editItem(element: any){
    this.userData = element;
    this.isEditMode = true;
  }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'Usuario_id',
    'Nombres',
    'Apellidos',
    'Correo',
    'Numero_telefono',
    'Pais',
    'Acciones'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  //Nesesario importar sus modules en material.module.ts
  @ViewChild(MatSort, { static: true }) Sort!: MatSort;

  constructor(private userService: UsersService , public dialog: MatDialog) {
  }

  //Ventana Modal

  openDialogDelete(user_id : string) {
    const dialogRef = this.dialog.open(DialogDeleteUser, {
      data: { nombre :  this.userDeleted},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.userDeleted = result;
      if(this.userDeleted){
        this.deleteUser(user_id);
      }
    });
  }

  /*
  openDialogAdd() {
    const dialogRef = this.dialog.open(DialogAddUser, {
      data: { usuario  :  this.userData},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.userDeleted = result;
      if(this.userDeleted){
        this.deleteUser(user_id);
      }
    });
  }
  */

  //

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.Sort; 
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getUsers().subscribe((response: any) => {
      this.dataSource.data = response;
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


  //delete
  deleteUser(id: string){
    this.userService.deleteUser(id).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.filter((o: any)=>{
        this.userDeleted = false;
        this.getAllUsers();
        return o.id !== id ? o : false;
      })
    })
    console.log(this.dataSource.data);
  }


  //add
  addUser(){ 
    this.userData._id = this.dataSource.data.length + 1; //this.dataSource.data.length + 1;
    this.userService.createUser(this.userData).subscribe((response: any)=>{
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        this.getAllUsers();
        return o;
      })
    })
  }

  //update
  updateUser(){
    this.userService.updateUser(this.userData._id, this.userData).subscribe((response: any)=>{
      this.dataSource.data = this.dataSource.data.map((o: any)=>{
        if(o.Usuario_ID === response.Usuario_ID){
          o = response;
        }
        this.getAllUsers();
        return o;
      })
    })
  }
}


@Component({
  selector: 'dialog-delete-user',
  templateUrl: './dialogs/dialog-delete-user.html',
  styleUrls: ['./dialogs/dialog-delete-user.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatDialogModule],
})
export class DialogDeleteUser {
  constructor(public dialogRef: MatDialogRef<DialogDeleteUser>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

/* 
@Component({
  selector: 'dialog-create-user',
  templateUrl: './dialogs/dialog-create-user.html',
  styleUrls: ['./dialogs/dialog-create-user.css'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule,MatFormFieldModule,MatDialogModule,FormsModule],
})
export class DialogAddUser {
  constructor(public dialogRefs: MatDialogRef<DialogAddUser>) {}

  onNoClick(): void {
    this.dialogRefs.close();
  }
}
*/