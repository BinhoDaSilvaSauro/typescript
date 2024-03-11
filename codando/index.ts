const totalSumNum = (first: number, last: number) => {
    if (last > first) {
        console.log((last - first + 1) * (first + last) / 2)
    } else {
        console.log("O último número '%d' precisa ser maior que o primeiro '%d'!", last, first)
    }
}

totalSumNum(4, 2)