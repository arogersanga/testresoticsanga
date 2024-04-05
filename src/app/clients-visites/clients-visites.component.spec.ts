import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsVisitesComponent } from './clients-visites.component';

describe('ClientsVisitesComponent', () => {
  let component: ClientsVisitesComponent;
  let fixture: ComponentFixture<ClientsVisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsVisitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsVisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
