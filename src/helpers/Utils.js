export const getDistinct = (array, property) => {
    return array.reduce((unique, i) => {
        if(!unique.some(obj => obj[property] === i[property])){
            unique.push({'id': i.id, [property]: i[property]});
        }
        return unique;
    }, []);
}