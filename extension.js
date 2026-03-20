const vscode = require('vscode')
const path = require('path')
const fs = require('fs')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    downloadMLangExec(context)

    let disposable = vscode.commands.registerCommand('mlang.runFile', () => {
        const editor = vscode.window.activeTextEditor
        if (editor) {
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal("Execução")
            terminal.show()

            const jarPath = path.join(context.extensionPath, 'mlang.jar')
            const filePath = editor.document.fileName
            terminal.sendText(`java -jar "${jarPath}" "${filePath}"`)
        }
    })

    context.subscriptions.push(disposable)
}

/**
 * @param {vscode.ExtensionContext} context
 */
async function downloadMLangExec(context) {
    try {
        //await vscode.workspace.fs.createDirectory(context.extensionPath)

        const fileUri = vscode.Uri.joinPath(context.extensionPath, "mlang.jar")

        const response = await fetch("https://jitpack.io/com/github/moniq-e/mlang/v0.1.0/mlang-v0.1.0.jar")
        const arrayBuffer = await response.arrayBuffer()
        const data = new Uint8Array(arrayBuffer)

        await vscode.workspace.fs.writeFile(fileUri, data)
        fs.chmodSync(fileUri.path, 0o755)

        console.log(`Salvo em: ${fileUri.fsPath}`)
    } catch (err) {
        vscode.window.showErrorMessage(`Erro ao salvar binário: ${err.message}`)
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
