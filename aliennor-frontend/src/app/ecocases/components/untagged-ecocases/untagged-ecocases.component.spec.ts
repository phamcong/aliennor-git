import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UntaggedEcocasesComponent } from './untagged-ecocases.component';

describe('UntaggedEcocasesComponent', () => {
  let component: UntaggedEcocasesComponent;
  let fixture: ComponentFixture<UntaggedEcocasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UntaggedEcocasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UntaggedEcocasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
