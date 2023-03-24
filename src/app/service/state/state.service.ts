import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { UserData } from "src/app/shared/interfaces";

export interface AppState {
  user: UserData | null;
}

export interface AppStateAction {
  type: string;
  payload: any;
}

@Injectable({ providedIn: "root" })
export class AppStateStore {

  public appStates: AppState;
  public appStateStore$: Subject<AppState>;

  constructor() {
    this.appStates = this.generateBlankAppState();
    this.appStateStore$ = new BehaviorSubject(this.appStates);
  }

  appStateReducer(action: AppStateAction) {
    switch (action.type) {
      case "REFRESH":
        this.refresh();
        return;
      case "SET_USER":
        this.setUser(action.payload);
        return;
      default:
        return;
    }
  }

  clearAppState() {
    const clearState: AppState = Object.assign(
      this.appStates,
      this.generateBlankAppState()
    );
    this.emitNewState(clearState);
  }

  getProp(propName: keyof AppState): any {
    if (propName in this.appStates) {
      return this.appStates[propName];
    }
    return null;
  }

  private generateBlankAppState(): AppState {
    return {
      user: null
    };
  }

  private emitNewState(newState: AppState) {
    this.appStateStore$.next(newState);
  }

  private refresh() {
    const newState: AppState = Object.assign(this.appStates, {});
    this.emitNewState(newState);
  }

  private setUser(newUser: UserData) {
    const newState: AppState = Object.assign(this.appStates, {
      user: newUser
    });
    this.emitNewState(newState);
  }
}