export default (key, value, lvl) => {
    const output = Math.round(value + value * lvl / 3);

    if (key === 'stamina' || key === 'intelligence') return output * 10;
    return output;
};
