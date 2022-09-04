import * as vscode from 'vscode';
import { getSqlTables } from "./getSqlTables";

export function getColumnNames(str: string) {
    const tables = getSqlTables(str)?.join('|');
    const columnNames = str.split(' ');
    let result = [];
    const column = columnNames.filter(e => {
        if(columnNames.indexOf('.') > -1) {
           return true;
        }
    });
    return column.map(e => {
        return {
            index: str.indexOf(e),
            str: e,
        };
    });
}