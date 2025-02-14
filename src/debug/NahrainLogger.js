export class NahrainLogger {
    static log(...args) {
        if (process.env.NODE_ENV === "development") {
            console.log(...args);
        }
    }

    static warn(...args) {
        if (process.env.NODE_ENV === "development") {
            console.warn(...args);
        }
    }

    static error(...args) {
        console.error(...args);
    }
}

