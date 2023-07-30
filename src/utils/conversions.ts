
export function secToMinSec(totalSeconds:number) {
    const minutes = Math.round(Math.floor(totalSeconds / 60) * 100) / 100;
    const seconds = Math.floor(totalSeconds % 60);
    return `${padTo2Digits(minutes)} : ${padTo2Digits(seconds)}`
}

function padTo2Digits(num:number) {
    return num.toString().padStart(2,'0');
}