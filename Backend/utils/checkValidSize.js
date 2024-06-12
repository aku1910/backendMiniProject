function isValidSize(size) {
    const sizePattern = /^(S|M|L|XL|XXL|XXXL|D{1,2})$/i
    return sizePattern.test(size)
}
export default isValidSize