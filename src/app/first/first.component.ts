import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  // @ts-ignore
  @Input() user: User;

  get userFirstName(): string {
    return this.user.firstname;
  }
  get userSecondName(): string {
    return this.user.secondName;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
export interface User {
  firstname: string;
  secondName: string;
}
