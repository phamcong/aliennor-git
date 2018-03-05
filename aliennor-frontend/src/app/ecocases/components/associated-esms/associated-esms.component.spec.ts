import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedEsmsComponent } from './associated-esms.component';

describe('AssociatedEsmsComponent', () => {
  let component: AssociatedEsmsComponent;
  let fixture: ComponentFixture<AssociatedEsmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatedEsmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedEsmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
