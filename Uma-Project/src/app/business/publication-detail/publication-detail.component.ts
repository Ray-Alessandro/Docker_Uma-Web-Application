import { Component } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Comentario } from 'src/app/models/comentario.model';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-publication-detail',
  templateUrl: './publication-detail.component.html',
  styleUrls: ['./publication-detail.component.css']
})
export class PublicationDetailComponent {
  publication : Publication = {
    _id: null,
    titulo: null,
    descripcion: null,
    fecha: null,
    imagenes: null,
    tienda_id: null,
    producto_id: null
  };  
  comments : Comentario[] = [];
  comment !:Comentario;
  id: any;
  
  formData = new FormGroup({
    'comentario': new FormControl('', Validators.required),
    'usuario_id': new FormControl('', Validators.required),
  });


  constructor( private route: ActivatedRoute, private publicationService:PublicationService, private comentarioService: CommentService,  private fb: FormBuilder) { 
    this.comment= {} as Comentario;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getPublicationById();

  }
  ngOnInit(): void {
    this.getPublicationById();
    this.getAllComments();
    console.log(this.id);

  }
  onSubmit() {
    console.log(this.formData.value);
    this.createComment();
  }

  getPublicationById(){
    this.publicationService.getPublicationById(this.id).subscribe((data: any) => {
      this.publication = data;
      console.log(this.publication);
    });
  }

  getAllComments(){
    this.comentarioService.getAllComments(this.id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  createComment(){
    this.comment = {...this.formData.value} as Comentario;
    this.comment.publicacion_id = this.id;
    this.comment._id = this.comments.length + 1;
    console.log(this.comment._id);
    console.log(this.comment);
    console.log(this.comments);
    this.comentarioService.createComment(this.comment).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
    });
  }
  
}
