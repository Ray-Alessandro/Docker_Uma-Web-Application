import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  sidebarVisible: boolean = false;

  isLogged: boolean = false;

    constructor(private loginService: LoginService) {
      if (this.loginService.isUserLogged() == "logged") {
        this.isLogged = true;
      }
    }

  ngOnInit() {
      this.items = [
          {
              label: 'Update',
              icon: 'pi pi-refresh'
          },
          {
              label: 'Delete',
              icon: 'pi pi-times'
          },
          {
              label: 'Angular',
              icon: 'pi pi-external-link',
              url: 'http://angular.io'
          },
          {
              label: 'Router',
              icon: 'pi pi-upload',
              routerLink: '/fileupload'
          }
      ];   
  }

  cerrarSesion(){
    this.loginService.userUnlogged();
    alert("Se cerro sesion correctamente");
    window.location.reload();
  }
}
