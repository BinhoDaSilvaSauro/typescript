// Construção do layout do jogo

const dictionary = ['frito', 'polvo', 'terra', 'lenha', 'prato']

/**
 * Representa o estado inicial de uma aplicação ou jogo baseado em grade.
 * 
 * @typeof {Object}
 * @property {string} secret - A palavra escolhida do dicionário.
 * @property {string[][]} grid - Uma grade 6x5 inicializada com strings vazias.
 * @property {number} currentRow - A linha atual ativa, inicializada em 0.
 * @property {number} currentCol - A coluna atual ativa, inicializada em 0.
 */
const state = {
    secret: dictionary[Math.floor(Math.random() * dictionary.length)],
    grid: Array(6)
        .fill()
        .map(() => Array(5).fill('')),
    currentRow: 0,
    currentCol: 0,
}

function updateGrid() {
    for (let i = 0; i < state.grid.length; i++) {
        for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`)
            box.textContent = state.grid[i][j]
        }
    }
}

/**
 * Cria e adiona uma caixa ('div') a um contéiner.
 * 
 * @param {HTMLElement} container - O contéiner onde a caixa será adicionada
 * @param {number} row - A linha onde a caixa será posionada.
 * @param {number} col - A coluna omde a caixa será posionada.
 * @param {string} letter [letter=''] - O conteúdo de texto da caixa (opcional).
 * @returns {HTMLDivElement} - A caixa ('div') criada
 * 
 * @example
 * const container = document.getElementById(container)
 * const box = drawBox(container, 6, 5, 'R')
 * console.log(box) // <div class="box" id="box65">R<div>
 */
export function drawBox(container, row, col, letter = '') { 
    const box = document.createElement('div')
    box.className = 'box'
    box.id = `box${row}${col}`
    box.textContent = letter

    container.appendChild(box)
    return box
}

/**
 * Cria e adiciona uma grade ('div') a um contéiner.
 * A grade é composta por várias caixas ('divs'), cada uma criada pela função 'drawBox'
 * 
 * @param {HTMLElement} container - O contéiner onde a grade será adicionada.
 * @param {number} row - O número de linhas na grade. 
 * @param {number} col - O número de colunas na grade.
 * 
 * @example
 * const container = document.getElementById(container)
 * drawGrid(container, 6, 5)
 * // Isso criará uma grade de 6 limhas por 5 colunas dentro de um contéiner.
 */
export function drawGrid(container, row, col) {
    const grid = document.createElement('div')
    grid.className = 'grid'

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            drawBox(grid, i, j)
        }
    }

    container.appendChild(grid)
}

function registerKeyboardEvents() {
    document.body.onkeydown = (e) => {
        const key = e.key
        if (key === 'Enter'){
            if (state.currentCol === 5) {
                const word = getCurrentWord()
                if (isWordValid(word)) {
                    revealWord(word)
                    state.currentRow++
                    state.currentCol = 0
                } else {
                    alert('Not a valid word.')
                }
            }
        }

        if (key === 'Backspace') {
            removeLetter()
        }

        if (isLetter(key)) {
            addLetter(key)
        }
        
        updateGrid()
    }
}

function getCurrentWord() {
    return state.grid[state.currentRow].reduce((prev, curr) => prev + curr)
}

function isWordValid(word) {
    return dictionary.includes(word)
}

function revealWord(guess) {
    const row = state.currentRow
    const animation_duration = 500

    for (let i = 0; i < 5; i++) {
        const box = document.getElementById(`box${row}${i}`)
        const letter = box.textContent

        setTimeout(() => {
            if (letter === state.secret[i]) {
                box.classList.add('right')
            } else if (state.secret.includes(letter)) {
                box.classList.add('wrong')
            } else {
                box.classList.add('empty')
            }
        }, ((i + 1) * animation_duration) / 2)

        box.classList.add('animated')
        box.style.animationDelay = `${(i * animation_duration) / 2}ms`
    }

    const isWinner = state.secret === guess
    const isGameOver = state.currentRow === 5

    setTimeout(() => {
        if (isWinner) {
            alert('Congratulations!')
        } else if (isGameOver) {
            alert(`Better luck next time! The word was ${state.secret}.`)
        }
    }, 3 * animation_duration);
}

function isLetter(key) {
    return key.length === 1 && key.match(/[a-z]/i)
}

function addLetter(letter) {
    if (state.currentCol === 5) return
    state.grid[state.currentRow][state.currentCol] = letter
    state.currentCol++
}

function removeLetter() {
    if (state.currentCol === 0) return
    state.grid[state.currentRow][state.currentCol - 1] = ''
    state.currentCol--
}

function startup() { 
    const game = document.getElementById('game')
    drawGrid(game, 6, 5)

    registerKeyboardEvents()
    console.log(state.secret)
}

startup()
