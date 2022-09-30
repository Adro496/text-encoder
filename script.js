// Selectores
const entrada = document.querySelector("#textareaEntrada");
const salida = document.querySelector("#textareaSalida");
const initialOutputSection = document.getElementById("initialOutputSection");
const outputSection = document.getElementById("outputSection");

// Oculta div de salida al cargar el sitio
outputSection.style.display = "none";

function botonEncriptar() {
    const strEncriptado = encriptar(entrada.value);
    if (entrada.value == "" || verificadorCaracteres(entrada.value) == false) {
        outputSection.style.display = "none";
        initialOutputSection.style.display = "flex";
    }
    else {
        initialOutputSection.style.display = "none";
        outputSection.style.display = "flex";
        salida.value = strEncriptado;
    }
}

function botonDesencriptar() {
    const strDesencriptado = desencriptar(entrada.value);
    if (entrada.value == "") {
        outputSection.style.display = "none";
        initialOutputSection.style.display = "flex";
    }
    else {
        initialOutputSection.style.display = "none";
        outputSection.style.display = "flex";
        salida.value = strDesencriptado;
    }
}

function botonCopiar() {
    navigator.clipboard.writeText(salida.value);
}

function verificadorCaracteres(strVerificando) {
//    const caracteresPermitidos = '"' + " º¡`+´ç<,.-ª!·$%&/()='?¿^*¨>;:_\|@#~€¬[]{}abcdefghijklmnñopqrstuvwxyz";
    const caracteresPermitidos = "! abcdefghijklmnñopqrstuvwxyz";
    let textoValido = true
    for (let i = 0; i < strVerificando.length; i++) {
        if (! (caracteresPermitidos.includes(strVerificando[i]))) {
            textoValido = false
            entrada.value = "";
            alert("Solo letras minúsculas y sin acentos");
            break;
        }
    }
    return textoValido;
}

function encriptar(strParaEncriptar) {
    let encryptedStr = "";
    for (let index = 0; index < strParaEncriptar.length; index++) {
        const character = strParaEncriptar[index];
        if (character == "a") {
            encryptedStr = encryptedStr + "ai";
            continue;
        }
        if (character == "e") {
            encryptedStr = encryptedStr + "enter";
            continue;
        }
        if (character == "i") {
            encryptedStr = encryptedStr + "imes";
            continue;
        }
        if (character == "o") {
            encryptedStr = encryptedStr + "ober";
            continue;
        }
        if (character == "u") {
            encryptedStr = encryptedStr + "ufat";
            continue;
        }
        else {
            encryptedStr = encryptedStr + character;
        }
    }
    return encryptedStr;
}

function desencriptar(strParaDesencriptar) {
    let matrizCodigo = [["ai","a"], ["enter", "e"], ["imes", "i"], ["ober", "o"], ["ufat", "u"]];
    for (let index = 0; index < matrizCodigo.length; index++) {
        if (strParaDesencriptar.includes(matrizCodigo[index][0])) {
            strParaDesencriptar = strParaDesencriptar.replaceAll(matrizCodigo[index][0], matrizCodigo[index][1])
        }
    }
    return strParaDesencriptar;
}