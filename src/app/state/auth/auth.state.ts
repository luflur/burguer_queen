import { Injectable } from '@angular/core';
import { State, Action, StateContext, Select, Selector } from '@ngxs/store';
import { Login } from './auth.actions';
import { AuthService } from './auth.service';

export class AuthStateModel {
  success: boolean
}

const defaults = {
  success: false
};

@State<AuthStateModel>({
  name: 'auth',
  defaults
})
@Injectable()
export class AuthState {

  @Selector()
  static success(state: AuthStateModel) {
    return state.success;
  }

  constructor( private authService: AuthService ) { }

  @Action(Login)
  login({ getState, setState }: StateContext<AuthStateModel>, { payload }: Login) {

  }
}
