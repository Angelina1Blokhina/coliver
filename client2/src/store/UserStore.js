import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._account = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = false
    }
    setUser(user) {
        this._user = user
    }
    setAccount(account){
        this._account = account
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get account(){
        return this._account
    }
}