import { Injectable } from '@angular/core';
import { State, Action, StateContext, Select, Selector } from '@ngxs/store';
import { Login } from './auth.actions';
import { AuthService } from './auth.service';
import { TokenUser } from 'src/app/models/token-user';
import { KEY_TOKEN } from 'src/app/constants/constants';
import { Preferences } from '@capacitor/preferences';

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
  login({ setState }: StateContext<AuthStateModel>, { payload }: Login) {
    return this.authService.login(payload.email, payload.password).then( async (token: TokenUser) => {
      if(token){
        await Preferences.set({ key: KEY_TOKEN, value: token.accessToken });
        setState({
          success: true
        })
      }else{
        setState({
          success: false
        })
      }
    }).catch( err => {
      setState({
        success: false
      })
    })
  }
}
