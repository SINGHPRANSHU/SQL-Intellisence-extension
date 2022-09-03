import * as vscode from 'vscode';
import { getAllOccurenceInBetweenString } from "./getAllOccurencesInString";

export const getSqlString = (doc: vscode.TextDocument, position: any) => {
    const str = getAllOccurenceInBetweenString(doc.getText(), '`');
    const currstr = str.filter(e => e.startcurrLine -1 <= doc.lineAt(position).lineNumber && e.endcurrLine -1 >= doc.lineAt(position).lineNumber);
    return currstr[0]?.str;
};