export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export function isObject(obj) {
    return !!obj && typeof obj === "object" && !Array.isArray(obj);
}