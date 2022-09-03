// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { provideCompletionItemsForDot } from './completionItems/ProviderCompletionItemForDot';
import { provideCompletionItemsForSpace } from './completionItems/providerCompletionItemsForSpace';
import { Schema } from './helpers/dbSchema';
import { getAllOccurenceInBetweenString } from './helpers/getAllOccurencesInString';
import { getSchema } from './helpers/getSchema';
import { getSqlTables } from './helpers/getSqlTables';
import { getUserInput } from './helpers/getUserInput';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sql-intellisence" is now active!');

	let schema: Schema = [];
	let disposable = vscode.languages.registerCompletionItemProvider (
		['javascript', 'typescript'],
		{
		  provideCompletionItems: provideCompletionItemsForDot({schema}),
		},
		...['.'] // trigger
	  );
	context.subscriptions.push(disposable);

	disposable = vscode.languages.registerCompletionItemProvider (
		['javascript', 'typescript'],
		// 'json',
		{
		 provideCompletionItems: provideCompletionItemsForSpace({schema}),
		},
		...[' '] // trigger
	  );
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(disposable);
     
    disposable = vscode.commands.registerCommand('sql-intellisence.start-sql-extension', async () => {
		let host = await getUserInput({placeHolder: 'Enter Host', prompt: ''}) as string;
		let user = await getUserInput({placeHolder: 'Enter USER', prompt: ''}) as string;
		let database = await getUserInput({placeHolder: 'Enter DATABASE', prompt: ''}) as string;
		let password = await getUserInput({placeHolder: 'Enter PASSWORD', prompt: ''}) as string;
	
		try {
			const schemaFromDb: Schema = (await getSchema({
				host,
				user,
				database,
				password,
			  })) as any;
			  schema.push(...schemaFromDb);
			  console.log(schema);
			vscode.window.showInformationMessage('MYSQL INTELLISENSE STARTED');
		} catch (error) {
			vscode.window.showErrorMessage('SOMETHING WHEN WRONG WHILE CONNECTING TO MYSQL');
		}
		 
	});
	context.subscriptions.push(disposable);
}


// this method is called when your extension is deactivated
export function deactivate() {}
