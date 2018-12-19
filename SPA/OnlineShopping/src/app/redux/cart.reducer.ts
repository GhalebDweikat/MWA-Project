import { Action } from '@ngrx/store'
import { cart } from './cart.model'
import * as CartActions from './cart.actions'





export function reducer(state: cart[] = [], action: CartActions.Actions) {
    switch (action.type) {
        case CartActions.ADD_CART:
            return [...state, action.payload];

        case CartActions.REMOVE_CART:
            state.splice(action.payload, 1)
            return state;
        default:
            return state;

      case CartActions.EMPTY_CART:
            return [];
    }
}
