import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcocasesComponent } from './ecocases.component';

describe('EcocasesComponent', () => {
  let component: EcocasesComponent;
  let fixture: ComponentFixture<EcocasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcocasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcocasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
