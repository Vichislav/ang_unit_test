import {TestingService} from "./testing.service";
import {TestBed} from "@angular/core/testing";
import {FirstDepedencyService} from "../first-dependensy/first-depedency.service";

describe('TestingService 2', () => {
  let service: TestingService; // обозначили service как экземпляр класса TestingService
  let firstDepedency: FirstDepedencyService; //-//-

  const fakeFirstDepedencyService = { // получается что это наш mock для FirstDepedencyService
    returnValue: jasmine.createSpy('returnValue'), //указываем методы FirstDepedencyService
    initValue: jasmine.createSpy('initValue') //указываем методы FirstDepedencyService
  };

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [TestingService,
        {provide: fakeFirstDepedencyService, useValue: fakeFirstDepedencyService}
      ]
    });
    service = TestBed.inject(TestingService); // присвоили service(y) TestingService
    firstDepedency = TestBed.inject(FirstDepedencyService) //-//-
    fakeFirstDepedencyService.returnValue.and.returnValue('two')
  })
  it('должен возвращать значение массива по указаному индексу', ()=> {
    const result = service.getValue(1)
    expect(result).toBe('two');
  })
})
