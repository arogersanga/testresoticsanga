import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './environnements/environnement';
import { ClientVisite } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public urlAPI = environment.urlAPI;
  public urlMAP = environment.urlMap;
  public clientVisite: any;
  public clientsVisitesArray: ClientVisite[] = [];
  public clientsVisitesList: BehaviorSubject<ClientVisite[]> = new BehaviorSubject<ClientVisite[]>(this.clientsVisitesArray);
  public readonly clientsVisitesList$: Observable<ClientVisite[]> = this.clientsVisitesList.asObservable();
  public adressesProperties: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public readonly adressesProperties$: Observable<any> = this.adressesProperties.asObservable();
  public adresseCoordonnesMap: BehaviorSubject<Map<string, string[]>> = new BehaviorSubject<Map<string, string[]>>(new Map());
  public readonly adresseCoordonnesMap$: Observable<any> = this.adresseCoordonnesMap.asObservable();
  public coordonneesMap : Map<string, string[]>= new Map<string, string[]>();
  public adressesPropertiesArray: string[]=[];
  coordonneesArray:string[]=[];

  constructor(public http: HttpClient) { }

  getAllClientsVisites(): ClientVisite[] {
    return this.clientsVisitesArray;
  }

  public getClientVisiteById(id: number): ClientVisite {
    this.clientsVisitesArray = this.clientsVisitesList.getValue();
    let itemIndex = this.clientsVisitesArray.findIndex(item => item.id == id);
    return this.clientsVisitesArray[itemIndex];
  }

  addClientVisite(clientVisite: ClientVisite) {
    const clientsVisite = this.clientsVisitesList.getValue();
    const index = clientsVisite.length > 0 ? clientsVisite.length : 0;
    clientVisite.id = index;
    clientsVisite.unshift(clientVisite);
    this.clientsVisitesList.next(clientsVisite);

  }

  public updateClientVisite(client: ClientVisite) {
    this.clientsVisitesArray = this.clientsVisitesList.getValue();
    let itemIndex = this.clientsVisitesArray.findIndex(item => item.id == client.id);
    this.clientsVisitesArray[itemIndex] = client;
    this.clientsVisitesList.next(this.clientsVisitesArray);
  }

  public removeClientVisite(client: ClientVisite) {
    this.clientsVisitesArray = this.clientsVisitesList.getValue();
    this.clientsVisitesArray.splice(client.id, 1);
    this.clientsVisitesList.next(this.clientsVisitesArray);
  }

  public getAdresses(adresse: string) {
    const param = adresse.replaceAll(' ', '+');
     this.http.get<any>('https://api-adresse.data.gouv.fr/search/?q=' + param).subscribe(adressesBrut => {
      let adressesBrut1 = adressesBrut.features;
      adressesBrut1.forEach((_element: any) => {
        let JSONTrouveProperties = JSON.stringify( _element.properties.label);
        let JSONTrouveGeometrieX = JSON.stringify( _element.properties.x);
        let JSONTrouveGeometrieY = JSON.stringify( _element.properties.y);
        this.adressesPropertiesArray.unshift(JSONTrouveProperties);
        this.adressesProperties.next(this.adressesPropertiesArray);
         this.adressesPropertiesArray.unshift(JSONTrouveGeometrieX);
         this.coordonneesArray.unshift(JSONTrouveGeometrieX);
         this.coordonneesArray.unshift(JSONTrouveGeometrieY);
         this.coordonneesMap.set(JSONTrouveProperties, this.coordonneesArray);
         this.adresseCoordonnesMap.next(this.coordonneesMap);
      });
     });
  }
}
