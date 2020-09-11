import {WebElement} from "../../../../models/Element";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {AddWebelement, RemoveWebelement} from "../actions/Webelement.actions";
import {state} from "@angular/animations";

export class WebelementStateModel {
  webElements: WebElement[];
}

@State<WebelementStateModel>({
  name: 'webelements',
  defaults: {
    webElements: []
  }
})

export class WebelementState {
  @Selector()
  static getWebelements(state: WebelementStateModel) {
    return state.webElements;
  }

  @Action(AddWebelement)
  add({getState, patchState}: StateContext<WebelementStateModel>, {payload}: AddWebelement) {
    const state = getState();
    patchState({
      webElements: [...state.webElements, payload]
    });
  }

  @Action(RemoveWebelement)
  remove({getState, patchState}: StateContext<WebelementStateModel>, {payload}: RemoveWebelement) {
    patchState({
      webElements: getState().webElements.filter(i => i.color !== payload)
    });
  }
}
