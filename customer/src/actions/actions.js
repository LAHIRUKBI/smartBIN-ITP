// src/actions/actions.js

// Action Type
export const LOGIN = 'LOGIN';

// Action Creator
export const login = (userData) => {
    return {
        type: LOGIN,
        payload: userData
    };
};