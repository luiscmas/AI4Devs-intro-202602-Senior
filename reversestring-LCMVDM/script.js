/**
 * Reverse String — script.js
 * Invierte el orden de los caracteres de una cadena de texto.
 * El botón de inversión sólo se muestra cuando hay más de 3 caracteres.
 */

const inputEl    = document.getElementById('input');
const outputEl   = document.getElementById('output');
const reverseBtn = document.getElementById('reverseBtn');
const copyBtn    = document.getElementById('copyBtn');
const charCount  = document.getElementById('charCount');

/**
 * Invierte una cadena de texto carácter a carácter.
 * @param {string} str - Cadena a invertir.
 * @returns {string} Cadena invertida.
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}

/**
 * Muestra u oculta el botón según si hay más de 3 caracteres en el input.
 */
function updateButtonVisibility() {
    if (inputEl.value.length > 3) {
        reverseBtn.classList.add('visible');
    } else {
        reverseBtn.classList.remove('visible');
    }
}

/**
 * Lee el input, invierte el texto y muestra el resultado.
 */
function handleReverse() {
    const text = inputEl.value;

    if (!text.trim()) {
        outputEl.textContent = '—';
        outputEl.classList.remove('has-content');
        charCount.textContent = '0 caracteres';
        return;
    }

    const reversed = reverseString(text);

    // Animación flash al actualizar resultado
    outputEl.classList.remove('flash');
    void outputEl.offsetWidth; // reflow para reiniciar animación
    outputEl.classList.add('flash');

    outputEl.textContent = reversed;
    outputEl.classList.add('has-content');
    charCount.textContent = `${reversed.length} caracteres`;
}

/**
 * Copia el resultado al portapapeles.
 */
async function handleCopy() {
    const result = outputEl.textContent;
    if (!result || result === '—') return;

    try {
        await navigator.clipboard.writeText(result);
        copyBtn.textContent = '¡copiado!';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = 'copiar resultado';
            copyBtn.classList.remove('copied');
        }, 1500);
    } catch {
        copyBtn.textContent = 'error al copiar';
    }
}

// Eventos
reverseBtn.addEventListener('click', handleReverse);
copyBtn.addEventListener('click', handleCopy);

// Actualizar visibilidad del botón e inversión en tiempo real mientras se escribe
inputEl.addEventListener('input', () => {
    updateButtonVisibility();
    handleReverse();
});

// Atajo de teclado: Ctrl/Cmd + Enter también invierte
inputEl.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleReverse();
    }
});

