import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstComponent } from './first.component';

describe('FirstComponent', () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;

  beforeEach(async () => {
    // configureTestingModule - поднимает тестовый модуль
    await TestBed.configureTestingModule({
      declarations: [ FirstComponent ]
    })
      //метод .compileComponents проверят у всего тестового модуля
      //наличие компонентов и по url загружает и комплирует их шаблоны
    .compileComponents();
  });

  beforeEach(() => {
    // TestBed создает комопнент и помещает ее в fixture
    fixture = TestBed.createComponent(FirstComponent);
    // в переменную component мы помещаем экземпляр компонента  получается FirstComponent
    component = fixture.componentInstance;
    //сообщаем данные о полях компонента имитируем работу геттеров
    component.user = {
      firstname: 'John',
      secondName: 'Weak'
    }
    // detectChanges отвечает за изменения в компоненте
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('компонент выводит имя и фамилию через инпут', ()=> {
    component.user = {
      firstname: 'John',
      secondName: 'Doe'
    };
    expect(component.userFirstName).toBe('John');
    expect(component.userSecondName).toBe('Doe');
  })
});
