// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { provideCompletionItemsForDot } from './completionItems/ProviderCompletionItemForDot';
import { provideCompletionItemsForSpace } from './completionItems/providerCompletionItemsForSpace';
import { Schema } from './helpers/dbSchema';
import { getSchema } from './helpers/getSchema';
import { getUserInput } from './helpers/getUserInput';
import * as configuration from './configuration/configuration';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sql-intellisense" is now active!');

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
     
    disposable = vscode.commands.registerCommand('sql-intellisense.start-sql-extension', async () => {
		let	 host = configuration.get<string>('dbHost') || await getUserInput({placeHolder: 'Enter Host', prompt: ''}) as string;
		let	 user = configuration.get<string>('dbUser') || await getUserInput({placeHolder: 'Enter USER', prompt: ''}) as string;
		let	 database = configuration.get<string>('dbName') || await getUserInput({placeHolder: 'Enter PASSWORD', prompt: ''}) as string;
		let	 password = configuration.get<string>('dbPassword') || await getUserInput({placeHolder: 'Enter PASSWORD', prompt: ''}) as string;
		let	 port = configuration.get<string>('dbPort') || await getUserInput({placeHolder: 'Enter Port', prompt: ''}) as string;

		try {	
			const schemaFromDb: Schema = (await getSchema({
				host,
				user,
				database,
				password,
				port: parseInt(port) || 3306
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
