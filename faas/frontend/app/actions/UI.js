export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';

export function openLoginModal() {
    return {type: TOGGLE_LOGIN_MODAL, isOpen: true};
}

export function closeLoginModal() {
    return {type: TOGGLE_LOGIN_MODAL, isOpen: false};
}
