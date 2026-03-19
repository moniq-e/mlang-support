const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('mlang.runFile', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Execução");
            terminal.show();
            terminal.sendText(`mlang.jar "${editor.document.fileName}"`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
