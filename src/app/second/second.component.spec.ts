import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondComponent } from './second.component';
import {SecondDependencyService} from "../infrastructure/second-dependency.service";
import {FirstDependencyService} from "../infrastructure/first-dependency.service";
import {ReactiveFormsModule} from "@angular/forms";

describe('SecondComponent', () => {
  let component: SecondComponent;
  let fixture: ComponentFixture<SecondComponent>;

  const fakeFirstDependencyService = jasmine.createSpyObj('fakeFirstDep', ['start', 'startSecond'])

  beforeEach(async () => {
    //переписываем провайдером компонента что бы там не проскакивали настоящие зависимости и не мешали нашим мокам
    TestBed.overrideComponent(SecondComponent, {set: {providers: [
          {provide: FirstDependencyService, useValue: fakeFirstDependencyService}
        ]}});
    await TestBed.configureTestingModule({
      //в случаи работы с формами мы используем реальные инстанци классов для построения форм
      //а не моки зависимостей как это было до этого, почему мы и прописываем  imports: [ReactiveFormsModule],
      imports: [ReactiveFormsModule],
      declarations: [ SecondComponent ],
      providers: [
        //{provide: FirstDependencyService, useValue: fakeFirstDependencyService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fakeFirstDependencyService.startSecond.and.callFake(()=>console.log('Its a fake startSecond'))
    fixture = TestBed.createComponent(SecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
