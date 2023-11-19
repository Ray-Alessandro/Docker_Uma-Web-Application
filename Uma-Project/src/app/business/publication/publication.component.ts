import { Component } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  publications : Publication[] = [];

  constructor(private publicationService:PublicationService) { }
  ngOnInit(): void {
    this.getAllPublications();
  }

  getAllPublications(){
    this.publicationService.getAllPublications().subscribe((data: any) => {
      this.publications = data;
      console.log(this.publications);
    });
  }


}
