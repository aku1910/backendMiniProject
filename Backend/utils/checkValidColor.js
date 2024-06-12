function isValidHexColor(hex) {
    // Regular expression to match a hexadecimal color code
    var hexRegex = /^#([0-9A-F]{3}){1,2}$/i;
    return hexRegex.test(hex);
}

export default isValidHexColor