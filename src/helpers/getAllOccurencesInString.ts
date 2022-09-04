export function getAllOccurenceInBetweenString(str: string, char: string) {
    const result: {str: string, start: number, end: number, startcurrLine: number, endcurrLine: number}[] = [];
    let findStart = true;
    let start = 0;
    let end = 0;
    let currline = 1;
    let startcurrLine = 1;
    let endcurrLine = 1;
    let column = 0;
    const bracketStack: {startIndex: number, stopIndex: number, startLineNumber: number, stopLineNumber: number}[] = [];
    const bracketArr: {startIndex: number, stopIndex: number, startLineNumber: number, stopLineNumber: number}[] = [];
    
 for (let index = 0; index < str.length; index++) {
    const element = str[index];
    if( element === '\r\n' || element === '\n') {
        currline++;
        column = 0;
    }
    column++;
    if (element === '(') {
       bracketStack.push({startIndex: index, startLineNumber: currline, stopIndex: 0, stopLineNumber: 0});
    }
    if (element === ')' && bracketStack.length) {
        const bracketStackLastElement = bracketStack.pop();
        if (bracketStackLastElement) {
            bracketStackLastElement.stopIndex = index;
            bracketStackLastElement.stopLineNumber = currline;
            bracketArr.push(bracketStackLastElement);
        } 
    }
    if (element === char) {
        if (findStart) {
            start = index+1;
            findStart = false;
            startcurrLine = currline;
        }else {
            end = index+1;
            findStart = true;
            endcurrLine = currline;
            result.push({str: str.substring(start, end), start, end, startcurrLine, endcurrLine});
            startcurrLine = endcurrLine;
        }
        
    }
    
 }
 return {result, bracketArr};
}