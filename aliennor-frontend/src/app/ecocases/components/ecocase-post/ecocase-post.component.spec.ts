import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcocasePostComponent } from './ecocase-post.component';

describe('EcocasePostComponent', () => {
  let component: EcocasePostComponent;
  let fixture: ComponentFixture<EcocasePostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcocasePostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcocasePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
