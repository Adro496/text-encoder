// Selectors
const input = document.querySelector("#inputTextarea");
const output = document.querySelector("#outputTextarea");
const initialOutputSection = document.getElementById("initialOutputSection");
const outputSection = document.getElementById("outputSection");
const capAccentsWarning = document.getElementById("warningParagraph");
const copyButton = document.getElementById("copyButton");

// It hides output div on site load
outputSection.style.display = "none";

// It calls the encryptor, the text checker, and manipulates the DOM to show/hide certain elements
function encryptButton() {
    const encryptedString = encrypt(input.value);
    if (input.value == "" || inputTextChecker(input.value) == false) {
        outputSection.style.display = "none";
        initialOutputSection.style.display = "flex";
        input.focus();
    }
    else {
        initialOutputSection.style.display = "none";
        outputSection.style.display = "flex";
        output.value = encryptedString;
        capAccentsWarning.style.color = "";
    }
}

// It calls the decryptor and manipulates the DOM to show/hide certain elements
function decryptButton() {
    const decryptedStr = decrypt(input.value);
    if (input.value == "") {
        outputSection.style.display = "none";
        initialOutputSection.style.display = "flex";
        input.focus();
    }
    else {
        initialOutputSection.style.display = "none";
        outputSection.style.display = "flex";
        output.value = decryptedStr;
    }
}

// It copies the encrypted/decrypted text and produces the transitions that communicate it to the user
function copyButtonFunction() {
    navigator.clipboard.writeText(output.value);
    copyButton.style.transition = "opacity 0.8s ease-in";
    copyButton.innerHTML = "Done!";
    copyButton.style.color = "white";
    copyButton.style.background = "#0A3871";
    copyButton.style.opacity = 0;
    
    setTimeout(function() {
        copyButton.style.transition = "none";
        copyButton.innerHTML = "Copy";
        copyButton.style.color = "#0A3871";
        copyButton.style.background = "";
        copyButton.style.opacity = 1;
    }, 800)
}

// Verify that the user has only entered lowercase letters without accents
function inputTextChecker(verifyingStr) {
    const allowedCharacters = "! abcdefghijklmnñopqrstuvwxyz";
    let textValidity = true
    for (let i = 0; i < verifyingStr.length; i++) {
        if (! (allowedCharacters.includes(verifyingStr[i]))) {
            textValidity = false
            input.value = "";
            capAccentsWarning.style.color = "red";
            break;
        }
    }
    return textValidity;
}

function encrypt(encryptingStr) {
    let encryptedStr = "";
    for (let index = 0; index < encryptingStr.length; index++) {
        const character = encryptingStr[index];
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

function decrypt(decryptingStr) {
    let decryptionCode = [["ai","a"], ["enter", "e"], ["imes", "i"], ["ober", "o"], ["ufat", "u"]];
    for (let index = 0; index < decryptionCode.length; index++) {
        if (decryptingStr.includes(decryptionCode[index][0])) {
            decryptingStr = decryptingStr.replaceAll(decryptionCode[index][0], decryptionCode[index][1])
        }
    }
    return decryptingStr;
}