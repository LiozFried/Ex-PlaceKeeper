'use strict'

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    var value = localStorage.getItem(key)
    return JSON.parse(value)
}

function makeRandId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var randId = ''
    for (let i = 0; i < length; i++) {
        randId += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randId
}