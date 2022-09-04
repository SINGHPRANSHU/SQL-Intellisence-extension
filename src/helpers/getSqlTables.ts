import * as vscode from 'vscode';

export function getSqlTables(str: string) {
   return str.match(/(?<=from|join)\s+(\w+)/g);
}