import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FirstComponent} from './first.component';
import {By} from "@angular/platform-browser";
import {FirstDependencyService} from "../infrastructure/first-dependency.service";

describe('FirstComponent', () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;

  //делаем мок зависимости с последующем указанием ее в провайдерах (см. ниже)
  const fakeFirstDependencyService = jasmine.createSpyObj('fakeFirstDep', ['start'])
  beforeEach(async () => {
    // configureTestingModule - поднимает тестовый модуль
    await TestBed.configureTestingModule({
      declarations: [ FirstComponent ],
      providers: [{
        provide: FirstDependencyService, useValue: fakeFirstDependencyService,
      }]
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
    fakeFirstDependencyService.start.and.callFake(()=>console.log('Its a fake first dep'))
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
  it('проверка суммы метода sum', ()=> {
    expect(component.sum(2, 3)).toBe(5);
  })
  //********проверка @Output **************************
  it('компонент должен отпрапвлять событие с именем пользователя', ()=>{
   //выставляем шпиона   exampleEvent в поле! buttonClicked на метод! emit
   const exampleEvent = spyOn(component.buttonClicked, 'emit')
    //присваиваем полю имя
    component.user = {
      firstname: 'Lisa',
      secondName: 'Pavlova'
    };
    //вызываем клик
    component.clickOnButton();
    //проверяем был ли совершен вызов функции, имя Lisa
    expect(exampleEvent).toHaveBeenCalledWith('Lisa');
  })
    //*********************Эмитация собития из шаблона из html получается ***********************
  it('Компонент должен отправлять собитие по клику на кнопку в шаблоне', ()=>{
    //выставляем шпиона   exampleEvent в поле! buttonClicked на метод! emit
    const exampleEvent = spyOn(component.buttonClicked, 'emit')
    //получаем кнопку (By нужно импротировать тотолько из платформ браузера)
    const button = fixture.debugElement.query(By.css('button'));
    //обезапасим себя от "шальных", раних вызовов функиции и обнулим их
    exampleEvent.calls.reset();
    //query возвращает debugElement а не настоящий, используем nativeElement
    //что бы можно было имитировать клик
    button.nativeElement.click();
    //выстраиваем ожидания
    expect(exampleEvent).toHaveBeenCalledWith('John');
  })
  //*****************проверка css  в шаблоне*******************************
  it('компонент добавляет класс fill если у объекта user есть имя и фамилия', ()=>{
    component.user = {
      firstname: 'Olga',
      secondName: undefined
    };
    //мы поменяли данные шаблона по так что нам нужно использовать detectChanges
    fixture.detectChanges();
    //получаем элемент span по классу (если бы прописывали селектор для id то в начале ставили бы #)
    const firstSpan = fixture.debugElement.query(By.css('.fill'));
    //проверяем что его нет так как класс НЕ добавлися так как обьъет без фамилии
    expect(firstSpan).toBeNull();
  })
});
