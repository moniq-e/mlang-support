const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('mlang.runFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Execução");
            terminal.show();

            const jarPath = path.join(context.extensionPath, 'mlang.jar');
            const filePath = editor.document.fileName;
            terminal.sendText(`java -jar "${jarPath}" "${filePath}`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
