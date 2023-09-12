export interface ICaption {
    start:number,
    end:number,
    content:string
}

export function parseVtt(vtt:string) {
    // const lines = vtt.split("\n");
    const formattedArray:ICaption[] = [];
    const cleanedVtt = vtt.replace(/<i>(.*?)<\/i>/g,'$1');
    
    const lines = cleanedVtt.split("\n");
    let currObj:ICaption | undefined = undefined;

    lines.map(line => {
        
        if(line.includes('-->')) {
            const removedSpaces = line.split(" ").join("");
            const [start,end] = removedSpaces.split('-->');
            currObj = { 
                start: timeToSeconds(start),
                end: timeToSeconds(end),
                content: '' 
            };
           
        } else if(line.trim()) {
            if (currObj) {
                currObj.content += line.trim() + ' ';
            }
            // currObj.content += line.trim() + ' ';
        } else if(currObj && currObj.start !== undefined) {
            formattedArray.push(currObj);
            currObj = undefined;
        }
    })
    // console.log("Formatted",formattedArray);
    return formattedArray;

    // return
    
}

export function timeToSeconds(timeString:string) {
    const parts = timeString.split(":");
    // console.log("PArts",parts);
    
    let time = parts.reduce((acc,time) => (60 * acc) + +time,0);

    return time;
    
}