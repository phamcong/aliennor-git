import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsmEcocasesComponent } from './esm-ecocases.component';

describe('EsmEcocasesComponent', () => {
  let component: EsmEcocasesComponent;
  let fixture: ComponentFixture<EsmEcocasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsmEcocasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsmEcocasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
