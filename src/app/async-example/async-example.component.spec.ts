import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncExampleComponent } from './async-example.component';
import {DependencyService} from "../dependency/dependency.service";
import {of, throwError} from "rxjs";

describe('AsyncExampleComponent', () => {
  let component: AsyncExampleComponent;
  let fixture: ComponentFixture<AsyncExampleComponent>;

  const fakeDependencyService = jasmine.createSpyObj('fakeDepService', ["asyncExample", "observerExample"])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncExampleComponent ],
      providers: [
        {provide: DependencyService, useValue: fakeDependencyService}
      ]
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
  it('asyncExample возвращает промис с указанным параметром - async/await', async()=>{
    const result = await component.asyncExample('Alice');
    expect(result).toBe('Alice');
  })
  it('asyncExample реджектит промис без указанным параметра - async/await', async()=>{
    try {
      await component.asyncExample();
    } catch (err) {
      expect(err).toBe('имя не указано')
    }
  })
  it('sayHiAsync, выводит строку приветствия для указанного имени', async ()=>{
    fakeDependencyService.asyncExample.and.returnValue(Promise.resolve('Hello'))
    const result = await component.sayHiAsync('Bob')
    expect(result).toBe('Hello, Bob!')
  })
  it('sayHiAsync, выводит строку приветствия для указанного имени', async ()=>{
    fakeDependencyService.asyncExample.and.returnValue(Promise.reject())
    const result = await component.sayHiAsync('Bob')
    expect(result).toBe('сервис вернул ошибку')
  })
  //если Promise возвращает что-то то это что-то можно проверять так
  it('asyncExample возвращает промис с указанным параметром - механизм промисов', ()=> {
    // функция asyncExample работает через промис поэтому мы возвращаем значение 'Alice'
    // и тогда реузльтат уже передаем в ожидание
    return component.asyncExample('Alice').then(result => {
      expect(result).toBe('Alice');
    })
  });
  it('asyncExample реджектит промис без указанным параметра - механизм промисов', async()=>{
    return component.asyncExample().then( undefined, error=> {
      expect(error).toBe('имя не указано');
    });
  });
  //если  Promise не возвращает что-то то его проверяем так
  it('promiseExample присваивает имя полю класса', ()=>{
    return component.promiseExample('Dan').then(()=>{
      expect(component.name).toBe('Dan');
    })
  })
  it('sayHiAsync, выводит строку приветствия для указанного имени - механизм промисов', ()=> {
    //метод asyncExample возвращающий Hello у нас находится в dependency, поэтому получаем значение через спая
    fakeDependencyService.asyncExample.and.returnValue(Promise.resolve('Hello'));
    return component.sayHiAsync('Alice').then(result => {
      expect(result).toBe('Hello, Alice!');
    });
  });
  //********Обзор метода callback done которые используются в основном для observers******
  // callback done -это параметр который можно передать в самую первую функицю теста что бы тест
  //завершился только тогда когда done() будет вызван, как концевик поставить
  it('asyncExample возвращает промис с указанным параметром - callback done', done =>{
    component.asyncExample('Alice').then(result => {
      expect(result).toBe('Alice');
      done();
    });
  });
  // done() еужно указывать в success блоке теста, потому что бывает так что в другой блок код и не зайдет
  // и получится что вызова done() так и не произайдет пример ниже, где done() у нас не после  expect(result)
  // а после expect(err) так как мы в asyncExample() не указали параметра и код пойдет в err ветку
  it('asyncExample реджектит промис без указаного имени - callback done', done =>{
    component.asyncExample().then(result => {
      expect(result).toBe('Alice');
    }, err => {
      expect(err).toBe('имя не указано')
      done();
    });
  });
  it('observableExample возвращает указанное значение - callback done', done =>{
    //подписываемся на observer что бы получить с него значение т.е. result и уже его передаем в ожидание
    component.observableExample('Dan').subscribe(result => {
      expect(result).toBe('Dan');
      done();
    });
  });
  //Если нам нужно вернуть Ошибку из обзервера
  it('observableExample возвращает ошибку если значение не найдено - callback done', done =>{
    component.observableExample().subscribe(undefined, error => {
      expect(error).toBe('нет имени')
      done();
    });
  });
  //Как тестировать subject
  it('subjectExampleMethod записывает имя в поле класса subject - callback done', done =>{
   //подписываемся на subject получает от него его result и его уже кидаем в ожидание
    component.subjectExample.subscribe(result =>{
      expect(result).toBe('Alice');
      done();
    });
    //тут мы передаем данные в subject
      component.subjectExampleMethod('Alice');
    });
  it('sayHiObservable возвращает приветсвие по указанному имени - callback done', done =>{
    //обращаемся к спаю зависимости что бы он вернул значение 'Hello' своего метода (для observer нужно еще писать of )
    fakeDependencyService.observerExample.and.returnValue(of('Hello'));
    //передаем в sayHiObservable имя 'Dan' и подписываемся на него что бы получить окончательный result
    component.sayHiObservable('Dan').subscribe(result =>{
      // и уже result ожидаем
      expect(result).toBe('Hello, Dan!');
      //не забываем закончить выполнение через указание done();
      done();
    })
  })
  //************Если зависимость вернула ошибку как это проверять***********************
  it('sayHiObservable выводит ошибку если сервис вернул ошибку - callback done', done =>{
    fakeDependencyService.observerExample.and.returnValue(throwError('сервис недоступен'));
    component.sayHiObservable('Dan').subscribe(undefined, error => {
      expect(error).toBe('сервис недоступен')
      done();
    })
  })
  //****************использование jasmine Clock********************************
  it('setNameAfterMinute записывает указанное имя в поле класса name спустя минуту', () => {
    //уставнавливаем clock() для этого теста
    jasmine.clock().install();
    //передаем имя в метод
    component.setNameAfterMinute('Alice');
    //задаем "скачок" времени
    jasmine.clock().tick(60000);
    //ожидаем назначения имени полю
    expect(component.name).toBe('Alice');
    // ОБЯЗАТЕЛЬНО обнуляем clock()
    jasmine.clock().uninstall();

  })
});
