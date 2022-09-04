import * as vscode from 'vscode';

export const PREFIX = 'sql-intellisense';

export enum DRIVER { // eslint-disable-line no-shadow
    mysql = 'mysql', // eslint-disable-line no-unused-vars
}

export type Configuration = {
    dbHost: string;
    dbPort: number;
    dbUser: string;
    dbPassword: string;
    dbName: number;
};

export function getConfiguration() {
    return vscode.workspace.getConfiguration();
}

export function get<T>(key: keyof Configuration): T {
    return getConfiguration().get<Configuration>(
        `${PREFIX}.${key}`,
    ) as unknown as T;
}