import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientVisiteDetailComponent } from './client-visite-detail.component';

describe('ClientVisiteDetailComponent', () => {
  let component: ClientVisiteDetailComponent;
  let fixture: ComponentFixture<ClientVisiteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientVisiteDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientVisiteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
