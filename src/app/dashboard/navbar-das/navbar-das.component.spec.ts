import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDasComponent } from './navbar-das.component';

describe('NavbarDasComponent', () => {
  let component: NavbarDasComponent;
  let fixture: ComponentFixture<NavbarDasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarDasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
