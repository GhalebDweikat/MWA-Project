
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { cart } from './cart.model'


export const ADD_CART = 'ADD'
export const REMOVE_CART = 'REMOVE'
export const EMPTY_CART = 'EMPTY'


export class AddCart implements Action {
    readonly type = ADD_CART

    constructor(public payload: cart) { }
}

export class RemoveCart implements Action {
    readonly type = REMOVE_CART

    constructor(public payload: number) { }
}

export class EmptyCart implements Action{
  readonly  type = EMPTY_CART

  constructor() { }

}


export type Actions = AddCart | RemoveCart | EmptyCart
