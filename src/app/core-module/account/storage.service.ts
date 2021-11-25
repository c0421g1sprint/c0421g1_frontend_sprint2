import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USERNAME_KEY = 'auth-user';
const ROLES_KEY = 'auth-role';
const PASSWORD = 'password';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public saveTokenSession(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsernameLocal(user) {
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.setItem(USERNAME_KEY, user);
  }
  public saveUsernameSession(user) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, user);
  }

  public getUsernameFromLocal() {
    return window.localStorage.getItem(USERNAME_KEY);
  }

  public getUsernameFromSession() {
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public saveRolesSession(roles) {
    window.sessionStorage.removeItem(ROLES_KEY);
    window.sessionStorage.setItem(ROLES_KEY,JSON.stringify(roles));
  }

  public getRole() {
    return JSON.parse(sessionStorage.getItem(ROLES_KEY));
  }

  public savePasswordLocal(password){
    window.localStorage.removeItem(PASSWORD);
    window.localStorage.setItem(PASSWORD, password);
  }

  public getPassword(){
    return window.localStorage.getItem(PASSWORD);
  }
}
