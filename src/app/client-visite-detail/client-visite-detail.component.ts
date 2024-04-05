
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from '../app.service';
import { ClientVisite } from '../app.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-client-visite-detail',
  standalone: true,
  imports: [MatListModule, MatLabel, MatDividerModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './client-visite-detail.component.html',
  styleUrl: './client-visite-detail.component.scss'
})
export class ClientVisiteDetailComponent implements OnInit{

removeActive: boolean = false;
editActive: boolean = false;
addActive: boolean = false;
showList: boolean = false;
public adressesProperties: BehaviorSubject<any> = new BehaviorSubject<any>([]);
public readonly adressesProperties$: Observable<any> = this.adressesProperties.asObservable();
public adresseCoordonnesMap: BehaviorSubject<Map<string, string>> = new BehaviorSubject<Map<string, string>>(new Map());
public coordonneesMap : Map<string, string>= new Map<string, string>();
coordonnesRecherche: string[] | undefined;
public adressesBrut : any;
   errorMessage = '';
   @ViewChild(MatPaginator) paginator!: MatPaginator;
  form : FormGroup = new FormGroup({
    id : new FormControl(''),
    nom : new FormControl(''),
    prenom : new FormControl(''),
    date : new FormControl(''),
    rue : new FormControl(''),
    label : new FormControl(''),
    labelSearch : new FormControl(''),
    longitude : new FormControl(''),
    latitude : new FormControl(''),
    ville : new FormControl('')
  });
  
  clientVisite: ClientVisite = this.form.value;
    public activatedRouteName! : string;
  
 constructor(public appService: AppService,  public router: Router, private activatedRoute: ActivatedRoute, public formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.clientVisite = this.appService.getClientVisiteById((Number)(this.activatedRoute.snapshot.paramMap.get('id')));
    if (this.clientVisite) { 
      this.addActive = false;
      this.editActive = true;
      this.removeActive = true;
    this.form.setValue({
      id: this.clientVisite.id, 
      nom: this.clientVisite.nom,
      prenom: this.clientVisite.prenom, 
      date: this.clientVisite.date,
      rue: this.clientVisite.rue, 
      ville: this.clientVisite.ville,
      label: this.clientVisite.label,
      labelSearch: this.clientVisite.labelSearch,
      latitude: this.clientVisite.latitude, 
      longitude: this.clientVisite.longitude
    });
  }
  } else {
    
    this.addActive = true;
    this.editActive = false;
    this.removeActive = false;
  }
}
  
  getClientVisiteById(id: number): ClientVisite {
    this.clientVisite = this.appService.getClientVisiteById(id);
    return this.clientVisite;
  }

 onSubmit(){
 this.appService.addClientVisite(this.form.value);
  this.form.reset();
  this.addActive = false;
  this.router.navigate(['']);

 }
 getInformationCoordonnesGPS(){
 }

edit() { 
this.appService.updateClientVisite(this.form.value);
this.editActive = false;
this.router.navigate(['']);
}

 remove(client: ClientVisite) {
  this.appService.removeClientVisite(client);
  this.removeActive = false;
  this.router.navigate(['']);
}

getAdresses() {
  this.showList = true;
    this.appService.getAdresses(this.form.value.rue);
    this.adressesProperties = this.appService.adressesProperties;
    console.log('mes adresse apres dans le composant ' + this.adressesProperties);
  }

  getCoordonnesGPS(adresseComplete: string) {
    this.coordonnesRecherche = this.appService.adresseCoordonnesMap.getValue().get(adresseComplete);
    console.log('coordonnes gps' + this.appService.adresseCoordonnesMap.getValue().get(adresseComplete));
    this.clientVisite.label = adresseComplete;
    //this.form.value.label = adresseComplete;
    this.clientVisite.latitude = this.coordonnesRecherche!=undefined?this.coordonnesRecherche[0]: 'undefined';
    this.clientVisite.longitude = this.coordonnesRecherche!=undefined?this.coordonnesRecherche[1]: 'undefined'; 
    console.log('coordonnes gps1'+ this.coordonnesRecherche);
  }
}