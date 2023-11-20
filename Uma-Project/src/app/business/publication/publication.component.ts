import { Component, ViewChild } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  publications : Publication[] = [];

  publicationData: Publication = {
    _id: null,
    titulo: null,
    descripcion: null,
    fecha: null,
    imagenes: null,
    tienda_id: null,
    producto_id: null
  };

  constructor(private publicationService: PublicationService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPublications();
  }

  @ViewChild('userForm', {static: false})
  publicationForm!: NgForm;

  onSubmit(){
    if(this.publicationForm.form.valid){
      console.log('valid');
      this.createPublication();
    } else{
      console.log('invalid data');
    }
  }

  getAllPublications(){
    this.publicationService.getAllPublications().subscribe((data: any) => {
      this.publications = data;
      console.log(this.publications);
    });
  }


  // ...



  createPublication(){
    this.publicationData._id = this.publications.length + 1;
    this.publicationService.createPublication(this.publicationData).subscribe((data: any) => {
      console.log(data);
      this.getAllPublications();
    });
  }

  irPublicacion(id: any){
    this.router.navigate(['/publications/', id]);
  }
}
