import { Component } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Comentario } from 'src/app/models/comentario.model';
import { CommentService } from 'src/app/services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';


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
    producto_id: null,
    producto:null,
  };  
  allComents: Comentario[] = [];

  isLogged: boolean = false;

  comments : any = [];
  comment !:Comentario;
  id: any;

  user!: any;
  
  formData = new FormGroup({
    'comentario': new FormControl('', Validators.required),
    //'usuario_id': new FormControl('', Validators.required),
  });


  constructor( private route: ActivatedRoute, private publicationService:PublicationService, private comentarioService: CommentService,  private fb: FormBuilder, private loginService : LoginService) { 
    this.comment= {} as Comentario;
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.getPublicationById();
    this.getAllCommentsById();



    if (this.loginService.isUserLogged() == "logged") {
      this.isLogged = true;
      this.user = this.loginService.getUser();
    }
    
  }

  ngOnInit(): void {
    this.getAllComents();
    console.log(this.id);
  }

  onSubmit() {
    console.log(this.formData.value);
    this.createComment();
  }

  getAllComents(){
    this.comentarioService.getComments().subscribe((data: any) => {
      this.allComents = data;
      console.log(this.allComents);
    });
  }

  getPublicationById(){
    this.publicationService.getPublicationById(this.id).subscribe((data: any) => {
      this.publication = data;
      console.log(this.publication);
    });
  }

  getAllCommentsById(){
    this.comentarioService.getAllComments(this.id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  createComment(){
    this.comment = {...this.formData.value} as Comentario;
    this.comment.usuario_id = this.user._id;
    this.comment.publicacion_id = this.id;

    this.comment._id = this.allComents.length + 1;

    console.log(this.comment._id);
    console.log(this.comment);
    console.log(this.comments);

    this.formData.reset();
    
    this.comentarioService.createComment(this.comment).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
      this.getPublicationById();
      this.getAllCommentsById();
      this.getAllComents();
    });
  }
  
}
