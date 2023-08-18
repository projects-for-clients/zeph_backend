import { user } from "@prisma/client";



interface UserObj {
    user: user;
}

export function exclude<T extends user, K extends keyof user>(
    items: T[],
    keys: K[]
): Omit<T, K>[] {

    return items.map(item => {
        const clone = { ...item };
        keys.forEach(key => delete clone[key]);
        return clone;
    })

}





export function excludeNested<
    T extends UserObj,
    K extends keyof user
>(
    items: T[],
    keys: K[]
): any {

    return items.map(item => {
        const { user, ...rest } = item;

        const newUser = { ...user };
        keys.forEach(key => delete newUser[key]);

        return {
            ...rest,
            ...newUser
        };

    });

}
