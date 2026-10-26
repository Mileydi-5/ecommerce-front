import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CouponAdmin } from './coupon-admin';

describe('CouponAdmin', () => {
  let component: CouponAdmin;
  let fixture: ComponentFixture<CouponAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(CouponAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
