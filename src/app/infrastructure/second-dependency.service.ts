import {Injectable} from "@angular/core";


@Injectable({
  providedIn: "root"
})

export class SecondDependencyService {

  start(): void {
    console.log('It s real second dependency')
  }
}
