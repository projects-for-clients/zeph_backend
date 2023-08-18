
export function exclude<T extends object, K extends keyof T>(
    items: T[],
    keys: K[]
): Omit<T, K>[] {

    return items.map(item => {
        const clone = { ...item };
        keys.forEach(key => delete clone[key]);
        return clone;
    })

}
