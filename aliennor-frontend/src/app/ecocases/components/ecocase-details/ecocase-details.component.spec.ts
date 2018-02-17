import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcocaseDetailsComponent } from './ecocase-details.component';

describe('EcocaseDetailsComponent', () => {
  let component: EcocaseDetailsComponent;
  let fixture: ComponentFixture<EcocaseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcocaseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcocaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
