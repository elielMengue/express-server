//// DON'T REPEAT YOURSELF ////

export default function generateId(): string {
    return crypto.randomUUID();
}