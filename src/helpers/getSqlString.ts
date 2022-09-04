import * as vscode from 'vscode';
import { getAllOccurenceInBetweenString } from "./getAllOccurencesInString";
import { getSqlQueryWithoutInnerQuery } from './getSqlQueryWithoutInnerQuery';

export const getSqlString = (doc: vscode.TextDocument, position: vscode.Position) => {
    const str = getAllOccurenceInBetweenString(doc.getText(), '`');
    const currstr = str.result.filter(e => e.startcurrLine -1 <= doc.lineAt(position).lineNumber && e.endcurrLine -1 >= doc.lineAt(position).lineNumber);
    
    if (currstr.length && str.bracketArr.length) {
        const offset = doc.offsetAt(position);
        const cursorLineNumber = doc.lineAt(position).lineNumber;
        let smallestStartDist = Infinity;
        str.bracketArr.forEach((e,i) => {
            if ( offset) {
                const startdist = offset - e.startIndex;
                const enddist = e.stopIndex - offset;
                console.log();
                if(e.startLineNumber - 1 <= cursorLineNumber && smallestStartDist > startdist && startdist >= 0 && enddist >= 0) {
                    smallestStartDist = i;
                }
            }  
        });
        if(smallestStartDist !== Infinity) {
            const currBracketArr = str.bracketArr[smallestStartDist];
            const sqlQueryInBracket = doc.getText().substring(currBracketArr.startIndex + 1, currBracketArr.stopIndex);
            console.log('asdasd', getSqlQueryWithoutInnerQuery(sqlQueryInBracket));   
            return getSqlQueryWithoutInnerQuery(sqlQueryInBracket);
        }
    }
    console.log(getSqlQueryWithoutInnerQuery(currstr[0]?.str));
    
    return getSqlQueryWithoutInnerQuery(currstr[0]?.str);
};