
export function secToMinSec(totalSeconds:number) {
    const minutes = Math.round(Math.floor(totalSeconds / 60) * 100) / 100;
    const seconds = Math.floor(totalSeconds % 60);
    return `${padTo2Digits(minutes)} : ${padTo2Digits(seconds)}`
}

function padTo2Digits(num:number) {
    return num.toString().padStart(2,'0');
}

export function msToTime(duration:number) {
    var seconds = Math.floor(duration % 60),
    minutes = Math.floor((duration / 60) % 60),
    hours = Math.floor(duration / (60 * 60)) % 24;

    let hoursString = (hours < 10) ? "0" + hours : hours;
    let minutesString = (minutes < 10) ? "0" + minutes : minutes;
    let secondsString = (seconds < 10) ? "0" + seconds : seconds;
    let finalTime = hoursString + ":" + minutesString + ":" + secondsString;
    return finalTime;
}