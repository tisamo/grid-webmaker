import {WebElement} from "../../../../models/Element";

export class AddWebelement {
  static readonly type = '[WEBELEMENT] Add';

  constructor(public payload: WebElement) {
  }

}

export class RemoveWebelement {
  static readonly type = '[WEBELEMENT] Remove';

  constructor(public payload: string) {
  }
}

