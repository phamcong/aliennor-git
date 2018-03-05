import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcocasesVisualizationComponent } from './ecocases-visualization.component';

describe('EcocasesVisualizationComponent', () => {
  let component: EcocasesVisualizationComponent;
  let fixture: ComponentFixture<EcocasesVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcocasesVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcocasesVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
