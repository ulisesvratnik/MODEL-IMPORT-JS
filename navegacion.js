let buscarBtn = document.querySelector('.buscarBtn')
let cerrarBtn = document.querySelector('.cerrarBtn')
let buscarBox = document.querySelector('#buscarBox')
let navegacion = document.querySelector('.navegacion')
let menuToggle = document.querySelector('.menuToggle')
let header = document.querySelector('header')


buscarBtn.onclick = function(){
    buscarBox.classList.add('active')
    cerrarBtn.classList.add('active')
    buscarBtn.classList.add('active')
    menuToggle.classList.add('hide')
}

cerrarBtn.onclick = function(){
    buscarBox.classList.remove('active')
    cerrarBtn.classList.remove('active')
    buscarBtn.classList.remove('active')
    menuToggle.classList.remove('hide')
}

menuToggle.onclick = function(){
    header.classList.toggle('open')
    buscarBox.classList.remove('active')
    cerrarBtn.classList.remove('active')
    buscarBtn.classList.remove('active')
}