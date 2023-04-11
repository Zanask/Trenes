"use strict";
// Variables generales del html
var login = document.getElementById("login");
var sign = document.getElementById("signup");
var trains = document.getElementById("trains");
var tickets = document.getElementById("tickets");
// Variables generales js
let vagones = Array();
let entradas = Array();
let contar = 0;
let thisVagon;
function registrate() {
    login.style.display = "none";
    sign.style.display = "flex";
}
function logeate() {
    sign.style.display = "none";
    login.style.display = "flex";
}
function trenes() {
    trains.style.display = "flex";
    login.style.display = "none";
}
// Hacemos registro de un usuario
function registro() {
    var nombre = document.getElementById("name2");
    var password = document.getElementById("pass2");
    var password2 = document.getElementById("pass3");
    nombre = nombre.value;
    password = password.value;
    password2 = password2.value;
    if (password == password2) {
        var usuario = {
            nombre: nombre,
            password: password
        };
        localStorage.setItem("usuario", JSON.stringify(usuario));
        alert("Usuario registrado correctamente");
        logeate();
    }
    else {
        alert("Las contraseñas no coinciden");
    }
}
// Hacemos login de un usuario
function logeado() {
    var nombre = document.getElementById("name");
    var password = document.getElementById("pass");
    nombre = nombre.value;
    password = password.value;
    var usuario = JSON.parse(localStorage.getItem("usuario"));
    //si no hay nada en localstorage avisar de error
    if (usuario == null) {
        alert("No hay usuarios registrados");
        return;
    }
    if (usuario.nombre == nombre && usuario.password == password) {
        alert("Bienvenido " + usuario.nombre);
        trenes();
    }
    else {
        alert("Usuario o contraseña incorrectos");
    }
}
// Funcion para generar los sillones
function vagonesS(vagon) {
    // Guardar los datos del local storage a local
    if (localStorage.getItem("vagones")) {
        localS();
    }
    else {
        for (let i = 0; i < 10; i++) {
            let a = new Array();
            for (let x = 0; x < 20; x++) {
                a.push(0);
            }
            vagones.push(a);
        }
    }
    let html = "";
    let trains = document.getElementById("trains");
    trains.style.display = "none";
    let sillones = document.getElementById("sillones");
    sillones.style.display = "block";
    let i = 0;
    for (let x = 0; x < 4; x++) {
        html += "<div class=\"content\">";
        for (let j = 0; j < 5; j++) {
            html += "<div id=\"sillon-" + i + "\"class=\"sillon\" onclick=\"seleccionar(this.id)\"></div>";
            i++;
        }
        html += "</div>";
    }
    html += "<br>";
    html += "<input type=\"submit\" value=\"Volver\" onclick=\"volver()\"><br><input type=\"submit\" value=\"Guardar\" onclick=\"guardar()\">";
    sillones.innerHTML = html;
    // miramos si hay alguna posicion del array igualada a 2 y la mostramos en rojo
    for (let i = 0; i < 10; i++) {
        for (let x = 0; x < 20; x++) {
            if (vagones[vagon][x] == 2) {
                let silla = document.getElementById("sillon-" + x);
                silla.style.backgroundColor = "red";
            }
        }
    }
    thisVagon = vagon;
}
// Funcion seleccionar de toda la vida vamos
function seleccionar(id) {
    // combertimos el id a numero
    let num1 = parseInt(id.substring(7));
    // vemos que el asiento no esté ocupado, si no, lo guardamos en una array
    if (vagones[thisVagon][num1] == 0) {
        let silla = document.getElementById(id);
        silla.style.backgroundColor = "green";
        vagones[thisVagon][num1] = 1;
    }
    else {
        alert("Asiento ocupado");
    }
}
// Funcion para guardar los datos en local storage
function guardar() {
    for (let i = 0; i < 10; i++) {
        for (let x = 0; x < 20; x++) {
            if (vagones[i][x] == 1) {
                vagones[i][x] = 2;
                for (let x = 0; x < 20; x++) {
                    if (vagones[thisVagon][x] == 2) {
                        let silla = document.getElementById("sillon-" + x);
                        silla.style.backgroundColor = "red";
                    }
                }
                contar++;
            }
        }
    }
    localStorage.setItem("vagones", JSON.stringify(vagones));
}
// Funcion para pasar los datos del local storage a local
function localS() {
    let num = localStorage.getItem("vagones");
    vagones = JSON.parse(num);
}
//Funcion para volver de vagones a trenes
function volver() {
    let trains = document.getElementById("trains");
    trains.style.display = "flex";
    let sillones = document.getElementById("sillones");
    sillones.style.display = "none";
}
// Funcion para volver de la factura a trenes
function volver2() {
    let trains = document.getElementById("trains");
    trains.style.display = "flex";
    let factura = document.getElementById("factura");
    factura.style.display = "none";
}
// factura, si está en uno de los vagones vips (0,8) la entrada vale 70€ si no vale 45€
function factura() {
    let trains = document.getElementById("trains");
    trains.style.display = "none";
    let factura = document.getElementById("factura");
    factura.style.display = "block";
    let html = "";
    html += "<h1>Factura</h1>";
    html += "<p>El precio de cada entrada es de 45€</p>";
    html += "<p>El precio de cada entrada VIP es de 70€</p>";
    html += "<p>Has reservado " + contar + " entradas</p>";
    if (thisVagon == 0 || thisVagon == 8) {
        html += "<p>El precio total es de " + contar * 70 + "€</p>";
    }
    else {
        html += "<p>El precio total es de " + contar * 45 + "€</p>";
    }
    html += "<input type=\"submit\" value=\"Volver\" onclick=\"volver2()\"><input type=\"submit\" value=\"Imprimir\" onclick=\"imprimir()\">";
    factura.innerHTML = html;
}
// Funcion para imprimir la factura
function imprimir() {
    window.print();
}
