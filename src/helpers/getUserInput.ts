import * as vscode from 'vscode';
export async function getUserInput(params : {placeHolder: string, prompt: string}) {
    const inputValue = await vscode.window.showInputBox({
        placeHolder: params.placeHolder,
        prompt: params.prompt || 'we only use your credentials to fetch schema and it gets removed everytime your vscode window reloads',
      });
      if(inputValue === ''){
        console.log(inputValue);
        vscode.window.showErrorMessage('A value is mandatory to execute this action');
      }
      
      if(inputValue !== undefined){
        return inputValue; 
      }
}