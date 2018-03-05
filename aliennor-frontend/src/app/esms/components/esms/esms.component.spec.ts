import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsmsComponent } from './esms.component';

describe('EsmsComponent', () => {
  let component: EsmsComponent;
  let fixture: ComponentFixture<EsmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
