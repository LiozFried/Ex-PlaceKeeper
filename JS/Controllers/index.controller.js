'use strict'

function onIndexInit() {
    const userData = loadUserData()
    if (!userData) return

    const { bgColor, txtColor, birthDate, birthTime } = userData

    renderColors(bgColor, txtColor)
    renderDateAndTime(birthDate, birthTime)
}

function renderColors(bgColor, txtColor) {
    const elPage = document.querySelector('body')
    elPage.style.backgroundColor = bgColor
    elPage.style.color = txtColor
}

function renderDateAndTime(birthDate, birthTime) {
    if (!birthDate || !birthTime) return

    document.querySelector('.birth-date').innerText = `Birth Date: ${birthDate}`
    document.querySelector('.birth-time').innerText = `Birth Time: ${birthTime}`
}