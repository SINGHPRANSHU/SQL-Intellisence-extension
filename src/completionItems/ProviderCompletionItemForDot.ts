import * as vscode from 'vscode';
import { Schema } from '../helpers/dbSchema';
import { getSqlString } from '../helpers/getSqlString';
import { getSqlTables } from '../helpers/getSqlTables';

export const provideCompletionItemsForDot = (params: {schema: Schema}) => {
    return (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) => {
        // get all text until the `position` and check if it reads `"launches.`
        const linePrefixForDot: string[] = document.lineAt(position).text.substring(0, position.character - 1).split(' ');
        const columnNameDorDot = linePrefixForDot[linePrefixForDot.length-1];
        let myitem = (text: any) => {
          let item = new vscode.CompletionItem(text, vscode.CompletionItemKind.Variable);
          item.range = new vscode.Range(position, position);
          return item;
        };
        console.log('asdlsknadlsa',...params.schema.find(e => e.tableName.toLowerCase() === columnNameDorDot.toLowerCase())?.columnName.map(e => myitem(e)) as any);
        if (!getSqlTables(getSqlString(document, position))?.length) {
             return [];
        }
        return [
          ...params.schema.find(e => e.tableName.toLowerCase() === columnNameDorDot.toLowerCase())?.columnName.map(e => myitem(e)) as any
        ];
      };
};