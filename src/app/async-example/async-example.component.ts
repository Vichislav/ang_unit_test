import { Component, OnInit } from '@angular/core';
import {DependencyService} from "../dependency/dependency.service";
import {catchError, map, observable, Observable, Subject, throwError} from "rxjs";

@Component({
  selector: 'app-async-example',
  templateUrl: './async-example.component.html',
  styleUrls: ['./async-example.component.css']
})
export class AsyncExampleComponent  {
  name = '';
  subjectExample: Subject<string> = new Subject<string>();

  constructor(private ds: DependencyService) { }

  asyncExample(name?: string): Promise<string> {
    return new Promise ((resolve, reject)=>{
      if (!name) {
        reject('имя не указано')
        return
      }
      setTimeout(()=>resolve(name))
    });
  }
  sayHiAsync(name: string): Promise<string> {
    return  this.ds.asyncExample().then(result =>{
      return `${result}, ${name}!`;
    }, () => {
      return 'сервис вернул ошибку';
    });
  }
  promiseExample(name?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(()=> {
        if(!name) {
          reject('нет имени')
          return;
        }
        this.name = name;
        resolve();
      }, 3000);
    });
  }
  observableExample(name?: string): Observable<string> {
    if(!name) {
      return throwError('нет имени');
    }
    return new Observable(observer => {
      setTimeout(()=>{
        observer.next(name);
        observer.complete();
      }, 1000);
    });
  }

  subjectExampleMethod(name: string): void {
    this.subjectExample.next(name);
  }

  sayHiObservable(name: string): Observable<string> {
    return this.ds.observerExample()
      .pipe(
        catchError(()=>throwError('сервис недоступен')),
        map(result =>`${result}, ${name}!`)
    );
  }

  setNameAfterMinute(name: string): void {
    setTimeout(() => {
      this.name = name;
    }, 60000);
  }
}
