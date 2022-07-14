import {Injectable} from "@angular/core";
import {FirstDepedencyService} from "../first-dependensy/first-depedency.service";

@Injectable({
  providedIn: "root"
})
export class TestingService {
  private firstDepedencyService: FirstDepedencyService;
  constructor(firstDepedencyService: FirstDepedencyService) {
    this.firstDepedencyService = firstDepedencyService;
    this.firstDepedencyService.initValue();
  }
  getValue(index: number): string {
    return this.firstDepedencyService.returnValue(index);
  }
  getIndex(): number {
    return 2;
  }
}
