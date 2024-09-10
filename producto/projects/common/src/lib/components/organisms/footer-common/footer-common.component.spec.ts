import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterCommonComponent } from './footer-common.component';

describe('FooterCommonComponent', () => {
  let component: FooterCommonComponent;
  let fixture: ComponentFixture<FooterCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterCommonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
