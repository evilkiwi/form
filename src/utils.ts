export const get = (object: Record<string, any>, path: string): any => {
    const keys = path.split(".");
    if (!Object.keys(object).includes(keys[0])) return;
    return keys.length === 1 ? object[keys[0]] : get(object[keys[0]], keys.slice(1).join("."));
};

export const set = (object: Record<string, any>, path: string, value: any): void => {
    const keys = path.split(".");
    if (keys.length === 1) {
        object[keys[0]] = value;
        return;
    }
    set(object[keys[0]], keys.slice(1).join("."), value);
};
