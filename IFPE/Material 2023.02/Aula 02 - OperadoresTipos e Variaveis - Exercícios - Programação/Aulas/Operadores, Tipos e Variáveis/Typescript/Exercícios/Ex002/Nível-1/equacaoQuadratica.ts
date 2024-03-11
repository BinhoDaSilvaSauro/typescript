const resolveEquacaoSegundoGrau = (a: number, b: number, c: number): string => {
    const delta = b * b - 4 * a * c;
    if (a == 0) {
        return("Delta é iqual a 0");
    } else if (delta < 0) {
        const parteReal = -b / (2*a);
        const parteImaginaria = Math.sqrt(-delta) / (2*a);
        console.log(delta)
        if (Number.isInteger(parteImaginaria)) {
            return `As raízes são ${parteReal} + ${parteImaginaria}i e ${parteReal} - ${parteImaginaria}i`;
        } else {
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
                if (divisores.length % 2 === 1) {
                    divisores.push(1)
                }
                for (let menor = 0, maior = 1; maior < divisores.length; menor += 2, maior += 2) {
                    if (divisores[menor] == divisores[maior]) {
                        parteRacional *= divisores[maior]
                    } else {
                        parteIrracional *= divisores[menor] * divisores[maior]
                    }
                }
                parteRacional /= (2*a)
                return [parteRacional, parteIrracional]
            }
            divisores = fatorar(-delta)
            const [parteRacional, parteIrracional] = separarRaizesDeInteiros(divisores)
            return `As raízes são ${parteReal} + ${parteRacional}√${parteIrracional}i e ${parteReal} - ${parteRacional}√${parteIrracional}i`
        }
    } else {
        const x1 = (-b + Math.sqrt(delta)) / (2*a)
        const x2 = (-b - Math.sqrt(delta)) / (2*a)
        return `As raízes são ${x1} e ${x2}`
    }
}
const resultado: string = resolveEquacaoSegundoGrau(1, 0, -7)
console.log(resultado)
