import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncExampleComponent } from './async-example.component';

describe('AsyncExampleComponent', () => {
  let component: AsyncExampleComponent;
  let fixture: ComponentFixture<AsyncExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncExampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
