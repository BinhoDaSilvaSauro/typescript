const delta: number = -396 * (-1)
let divisores: number[] = []

const fatorar = (delta: number): number[] => {
    if (delta == 1) {
        return divisores
    } else {
        if (delta % 2 == 0) {
            divisores.push(2)
            delta /= 2
            fatorar(delta)
        } else {
            let primo = 3
            while (delta % primo != 0) {
                primo += 2
            }
            divisores.push(primo)
            delta /= primo
            fatorar(delta)
        }
    }
    return divisores
}

const separarRaizesDeInteiros = (divisores: number[]) => {
    let parteRacional: number = 1
    let parteIrracional: number = 1
    divisores.sort
    if (divisores.length % 2 == 1) {
        divisores.push(1)
    }
    for (let menor = 0, maior = 1; maior < divisores.length; menor += 2, maior += 2) {
        if (divisores[menor] == divisores[maior]) {
            parteRacional *= divisores[maior]
        } else {
            parteIrracional *= divisores[menor] * divisores[maior]
        }
    }
    return [parteRacional, parteIrracional]
}

divisores = fatorar(delta)
divisores.forEach(element => {
    console.log(element)
})
console.log(delta)
const [parteReal, parteImaginaria] = separarRaizesDeInteiros(divisores)
console.log(`${parteReal}√${parteImaginaria}i `)

