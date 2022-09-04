import * as vscode from 'vscode';
import { Schema } from '../helpers/dbSchema';
import { getSqlString } from '../helpers/getSqlString';
import { getSqlTables } from '../helpers/getSqlTables';

export const provideCompletionItemsForSpace = (params: {schema: Schema}) => {
    return (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) => {
        // get all text until the `position` and check if it reads `"launches.`
        let linesuffixForFrom = document.lineAt(position).text.substring(position.character).split(' ').filter(e => e.trim());
        linesuffixForFrom = linesuffixForFrom.length ? linesuffixForFrom : document.lineAt(document.lineAt(position).lineNumber + 1).text.split(' ').filter(e => e.trim());
        let lineprefixForFrom = document.lineAt(position).text.substring(0, position.character).split(' ').filter(e => e.trim());
        lineprefixForFrom = lineprefixForFrom.length ? lineprefixForFrom : document.lineAt(document.lineAt(position).lineNumber - 1).text.split(' ').filter(e => e.trim());
        
        const columnNameSuffixForFrom = linesuffixForFrom[0];
        const columnNamePrefixForFrom = lineprefixForFrom[lineprefixForFrom.length - 1];
        
        let giveIntellisenseForColumnName = true;
        if (columnNameSuffixForFrom.toLowerCase() !== 'from' && columnNamePrefixForFrom.toLowerCase() !== 'on' && columnNamePrefixForFrom.toLowerCase() !== '=' && columnNamePrefixForFrom.toLowerCase() !== 'where' && columnNamePrefixForFrom.toLowerCase() !== 'from' && columnNamePrefixForFrom.toLowerCase() !== 'and' && columnNamePrefixForFrom.toLowerCase() !== 'or' && columnNamePrefixForFrom.toLowerCase() !== 'join' ) {
            return[];
        } else if (columnNameSuffixForFrom.toLowerCase() !== 'from' && columnNamePrefixForFrom.toLowerCase() !== 'on' && columnNamePrefixForFrom.toLowerCase() !== '=' && columnNamePrefixForFrom.toLowerCase() !== 'where' && columnNamePrefixForFrom.toLowerCase() !== 'and' && columnNamePrefixForFrom.toLowerCase() !== 'or') {
            giveIntellisenseForColumnName = false;
        }
        
        const filteredColumns = params.schema.filter(e => getSqlTables(getSqlString(document, position))?.map(table => table.toLowerCase().trim())?.includes(e.tableName.toLowerCase()));
        const newColumns: any[] = [];
        filteredColumns.forEach(e => e.columnName.forEach(column => newColumns.push(e.tableName + '.' + column)));
        let myitem = (text: any) => {
          let item = new vscode.CompletionItem(text, vscode.CompletionItemKind.Variable);
          item.range = new vscode.Range(position, position);
          return item;
        };
        
        return [
          ...(!giveIntellisenseForColumnName? params.schema.map(e => myitem(e.tableName)) : newColumns.map(e => myitem(e)))
        ];
      };
};