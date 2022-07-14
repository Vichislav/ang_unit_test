import {TestingService} from "./testing.service";
import {TestBed} from "@angular/core/testing";
import {FirstDepedencyService} from "../first-dependensy/first-depedency.service";

describe('TestingService', () => {
  let service: TestingService; // обозначили service как экземпляр класса TestingService
  let firstDepedency: FirstDepedencyService; //-//-
  let firstDepedencyReturnValueSpy;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [TestingService]
    });
    service = TestBed.inject(TestingService); // присвоили service(y) TestingService
    firstDepedency = TestBed.inject(FirstDepedencyService) //-//-
    //можно прописать шпиона здесь если он часто встречается в тестах? так же можно задать ему дефолт value - 'two'
    //что потом везде, где мы заводили шпиона можно было сразу писать firstDepedencyReturnValueSpy и уже от него брать нужные нам методы spy
    //firstDepedencyReturnValueSpy =  spyOn(firstDepedency, 'returnValue').and.returnValue('two');
  })
  it('shoud create', () =>{
    expect(service).toBeDefined();
  })
  it('должен возвращать значение массива по указаному индексу - оригинальный метод класса', ()=> {
    //используем оригинальный метод класса и предаем ему значсение 'two'
    const result = service.getValue(1)
    expect(result).toBe('two');
  })
  it('должен возвращать значение массива по указаному индексу - spyOn and callThrough', ()=> {
    //установили шпиона на метод returnValue класса firstDepedency, но вызываем все равно оригинальный метод
    spyOn(firstDepedency, 'returnValue').and.callThrough();
    const result = service.getValue(1)
    expect(result).toBe('two');
  })
  it('должен возвращать значение массива по указаному индексу - spyOn and callFake', ()=> {
    //установили шпиона на метод returnValue класса firstDepedency и возвращаем через fake функцию значение "two"
    spyOn(firstDepedency, 'returnValue').and.callFake(()=>"two");
    const result = service.getValue(1)
    expect(result).toBe('two');
  })
  it('должен возвращать значение массива по указаному индексу - spyOn and returnValue', ()=> {
    //установили шпиона на метод returnValue класса firstDepedency и сказали возвращать ему (шпиону) значение 'two'
    spyOn(firstDepedency, 'returnValue').and.returnValue('two');
    const result = service.getValue(1)
    expect(result).toBe('two');
  })
  it('должен возвращать значение массива returnValue по индексу от getIndex', ()=> {
    spyOn(service, 'getIndex').and.returnValue(0)
    const result = service.getValue(service.getIndex());
    expect(result).toBe('one')
  })
})
