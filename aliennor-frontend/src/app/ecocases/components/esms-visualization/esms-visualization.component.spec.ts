import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsmsVisualizationComponent } from './esms-visualization.component';

describe('EsmsVisualizationComponent', () => {
  let component: EsmsVisualizationComponent;
  let fixture: ComponentFixture<EsmsVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsmsVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsmsVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
