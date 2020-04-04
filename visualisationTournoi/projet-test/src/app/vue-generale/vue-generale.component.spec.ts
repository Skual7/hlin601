import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueGeneraleComponent } from './vue-generale.component';

describe('VueGeneraleComponent', () => {
  let component: VueGeneraleComponent;
  let fixture: ComponentFixture<VueGeneraleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueGeneraleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueGeneraleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
