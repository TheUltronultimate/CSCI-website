function getRandomFloat(min, max, decimals) {
    let str = (Math.random() * (max - min) + min);
    str = str.toFixed(decimals)
    str = parseFloat(str)
    return str
}

export{ getRandomFloat }