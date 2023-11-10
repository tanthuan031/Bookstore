export const deleteKeyValue = (arr, keys) => {
    return arr.map((e) =>
        Object.fromEntries(Object.entries(e).filter(([k]) => !keys.includes(k)))
    );
};
