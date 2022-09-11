import { table } from 'console';
import * as vscode from 'vscode';
import { Schema } from '../helpers/dbSchema';
import { getSqlString } from '../helpers/getSqlString';
import { getSqlTables } from '../helpers/getSqlTables';
import { removeSQLFunction } from '../helpers/removeSQLFunction';
import * as _ from 'lodash';

export const provideCompletionItemsForSpace = (params: {schema: Schema}) => {
    return (document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) => {
        // get all text until the `position` and check if it reads `"launches.`

        let linesuffixForFrom = removeSQLFunction(document.lineAt(position).text).substring(position.character).split(' ').filter(e => e.trim());
        linesuffixForFrom = linesuffixForFrom.length ? linesuffixForFrom : removeSQLFunction(document.lineAt(document.lineAt(position).lineNumber + 1).text).split(' ').filter(e => e.trim());
        let lineprefixForFrom = removeSQLFunction(document.lineAt(position).text).substring(0, position.character).split(' ').filter(e => e.trim());
        lineprefixForFrom = lineprefixForFrom.length ? lineprefixForFrom : removeSQLFunction(document.lineAt(document.lineAt(position).lineNumber - 1).text).split(' ').filter(e => e.trim());

        const columnNameSuffixForFrom = linesuffixForFrom[0];
        const columnNamePrefixForFrom = lineprefixForFrom[lineprefixForFrom.length - 1];
        
        let giveIntellisenseForColumnName = true;
        if (columnNameSuffixForFrom.toLowerCase() !== 'from' && columnNamePrefixForFrom.toLowerCase() !== 'on' && columnNamePrefixForFrom.toLowerCase() !== '=' && columnNamePrefixForFrom.toLowerCase() !== 'where' && columnNamePrefixForFrom.toLowerCase() !== 'from' && columnNamePrefixForFrom.toLowerCase() !== 'and' && columnNamePrefixForFrom.toLowerCase() !== 'or' && columnNamePrefixForFrom.toLowerCase() !== 'join'  && columnNamePrefixForFrom.toLowerCase() !== 'by') {
            return[];
        } else if (columnNameSuffixForFrom.toLowerCase() !== 'from' && columnNamePrefixForFrom.toLowerCase() !== 'on' && columnNamePrefixForFrom.toLowerCase() !== '=' && columnNamePrefixForFrom.toLowerCase() !== 'where' && columnNamePrefixForFrom.toLowerCase() !== 'and' && columnNamePrefixForFrom.toLowerCase() !== 'or'  && columnNamePrefixForFrom.toLowerCase() !== 'by') {
            giveIntellisenseForColumnName = false;
        }

        const sqlString = getSqlString(document, position);
        console.log(sqlString.tableNameAndItsAlias);
        
        const filteredColumns = params.schema.filter(e => getSqlTables(sqlString.sqlQueryWithoutInnerQuery)?.map(table => table.toLowerCase().trim())?.includes(e.tableName.toLowerCase()));
        let clonedFilteredColumn = _.clone(filteredColumns);
        const newFilteredColumn = clonedFilteredColumn.map(e => {
          const aliasMatched = sqlString.tableNameAndItsAlias?.find(table => table.tableName?.toLowerCase() === e.tableName.toLowerCase());
          return aliasMatched? { columnName: e.columnName, tableName: aliasMatched.alias}: e;
        });
        const newColumns: any[] = [];
        
        newFilteredColumn.forEach(e => e.columnName.forEach(column => newColumns.push( e.tableName + '.' + column)) );
        let myitem = (text: any) => {
          let item = new vscode.CompletionItem(text, vscode.CompletionItemKind.Variable);
          item.range = new vscode.Range(position, position);
          return item;
        };
        

        if(columnNameSuffixForFrom.toLowerCase() === 'from') {
          console.log('here', newColumns);
            return [
              ...(!giveIntellisenseForColumnName? params.schema.map(e => myitem(e.tableName)) : newColumns.map(e => myitem(e))),
              myitem('distinct'),
              myitem('group_concat'),
            ];
        }
        return [
          ...(!giveIntellisenseForColumnName? params.schema.map(e => myitem(e.tableName)) : newColumns.map(e => myitem(e)))
        ];
      };
};