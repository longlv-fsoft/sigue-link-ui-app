import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartInstanceComponent } from './chart-instance.component';

describe('ChartInstanceComponent', () => {
  let component: ChartInstanceComponent;
  let fixture: ComponentFixture<ChartInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
