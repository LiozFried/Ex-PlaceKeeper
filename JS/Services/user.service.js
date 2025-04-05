'use strict'

const STORAGE_KEY = 'userData'

function saveUserData(user) {
    saveToStorage(STORAGE_KEY, user)
}

function loadUserData() {
    return loadFromStorage(STORAGE_KEY)
}