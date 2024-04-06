import { ClientVisite } from '../app.model';
import { AppService } from '../app.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { ClientVisiteDetailComponent } from '../client-visite-detail/client-visite-detail.component';
@Component({
  selector: 'app-clients-visites',
  standalone: true,
  templateUrl: './clients-visites.component.html',
  styleUrl: './clients-visites.component.scss',
  imports: [MatIconModule, RouterLink, MatTableModule, MatSortModule, CommonModule, RouterOutlet, MatSortModule, MatDividerModule, ClientVisiteDetailComponent, MatPaginatorModule]

})
export class ClientsVisitesComponent implements OnInit {



  title = 'Test Resotic SANGA';
  affiche: boolean = false;
  nouveauClientVisite: ClientVisite | undefined;
  private clientsVisitesList: BehaviorSubject<ClientVisite[]> = new BehaviorSubject<ClientVisite[]>([]);

  public clientsVisitesList$: Observable<ClientVisite[]> = this.clientsVisitesList.asObservable();
  
  displayedColumns: string[] = ['id', 'nom', 'prenom', 'date', 'rue', 'ville', 'label', 'latitude', 'longitude', 'edition', 'suppression'];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;

  @ViewChild(MatSort)
  sort: MatSort | null = new MatSort;

  dataSource: MatTableDataSource<ClientVisite> = new MatTableDataSource(this.clientsVisitesList.getValue());;



  constructor(private _liveAnnouncer: LiveAnnouncer, public appService: AppService, public router: Router) {

  }
  ngOnInit(): void {
    this.clientsVisitesList = this.appService.clientsVisitesList;
    this.dataSource = new MatTableDataSource(this.clientsVisitesList.getValue());
  }

  addClientVisite() {
    this.router.navigate(['/add-client-detail']);
  }

  editerClientVisite(clientVisite: ClientVisite) {

    this.router.navigate(['/edit-client-detail', clientVisite.id]);
  }
  deleteClientVisite(clientVisite: ClientVisite) {

    this.router.navigate(['/remove-client-detail', clientVisite.id]);

  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator ? this.paginator : null;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}