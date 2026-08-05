export const calcDuration = (pickup, drop, mode) => {

    const diff = drop - pickup;

    if (mode === "HOUR") {
        return {
            duration: Math.ceil(diff / (1000 * 60 * 60))
        };
    }

    return {
        duration: Math.ceil(diff / (1000 * 60 * 60 * 24))
    };
};