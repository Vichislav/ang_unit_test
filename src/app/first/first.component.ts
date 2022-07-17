import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirstDependencyService} from "../infrastructure/first-dependency.service";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  // @ts-ignore
  @Input() user: User;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  get userFirstName(): string {
    return this.user.firstname;
  }
  get userSecondName(): string | undefined{
    return this.user.secondName;
  }
  // геттер по идее должен возвращзать try если есть и имя и фамилия
  get isNameFull(): boolean {
    return !!(this.user.firstname && this.user.secondName);
  }

  constructor(private fd: FirstDependencyService) { }

  ngOnInit(): void {
    this.fd.start();
  }
  sum (a: number, b: number): number {
    return a + b;
  }

  clickOnButton(): void {
    this.buttonClicked.emit(this.user.firstname);
  }

}
export interface User {
  firstname: string;
  secondName: string | undefined;
}
