// RANDOM PASSWORD GENERATOR — Yacine

function generatepass(length, upper, lower, numbers, symboles) {
    const upperchars    = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerchars    = "abcdefghijklmnopqrstuvwxyz";
    const numberchars   = "0123456789";
    const symboleschars = "+_)(*&^%$#@!=:?";

    let allowedchars = "";
    allowedchars += upper    ? upperchars    : "";
    allowedchars += lower    ? lowerchars    : "";
    allowedchars += numbers  ? numberchars   : "";
    allowedchars += symboles ? symboleschars : "";

    if (length <= 0) return "(length must be at least 1)";
    if (allowedchars.length === 0) return "(select at least one character type)";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += allowedchars[Math.floor(Math.random() * allowedchars.length)];
    }
    return password;
}

const lengthRange   = document.getElementById("lengthrange");
const lengthDisplay = document.getElementById("length-display");
const resultEl      = document.getElementById("result");
const copyBtn       = document.getElementById("copybtn");

lengthRange.addEventListener("input", () => {
    lengthDisplay.textContent = lengthRange.value;
});

document.getElementById("generate").addEventListener("click", () => {
    const upper    = document.getElementById("uppercheck").checked;
    const lower    = document.getElementById("lowercheck").checked;
    const numbers  = document.getElementById("numberscheck").checked;
    const symboles = document.getElementById("symbolescheck").checked;
    const length   = parseInt(lengthRange.value);

    const password = generatepass(length, upper, lower, numbers, symboles);

    resultEl.textContent = password;
    resultEl.classList.remove("password-pop");
    void resultEl.offsetWidth;
    resultEl.classList.add("password-pop");

    copyBtn.classList.add("visible");
    copyBtn.textContent = "COPY";
});

copyBtn.addEventListener("click", () => {
    const text = resultEl.textContent;
    if (!text || text === "···") return;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = "COPIED ✓";
        setTimeout(() => { copyBtn.textContent = "COPY"; }, 2000);
    });
});
