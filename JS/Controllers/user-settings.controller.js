'use strict'

function onRegister(ev) {
    ev.preventDefault()
    // console.dir(ev.target)
    const { email, age, bgc, txtColor, birthDate, birthTime } = ev.target

    const user = {
        email: email.value,
        age: age.value,
        bgColor: bgc.value,
        txtColor: txtColor.value,
        birthDate: birthDate.value,
        birthTime: birthTime.value,
    }

    saveUserData(user)

    window.location = 'index.html'
}

function onChooseAge(value) {
    document.querySelector('.range-age').innerText = value
}
