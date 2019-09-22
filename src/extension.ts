import * as vscode from "vscode";

import materialIconNames from "./materialIconNames";

export function activate(context: vscode.ExtensionContext) {
    console.log(
        'Congratulations, your extension "quick-material-icons" is now active!'
    );

    let disposable = vscode.commands.registerCommand(
        "extension.quickMaterialIcons.showIconList",
        () => {
            const panel = vscode.window.createWebviewPanel(
                "quickMaterialIcons.materialLibrary",
                "Material Icons Library",
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    enableFindWidget: true,
                    retainContextWhenHidden: true
                }
            );

            panel.webview.html = generateMaterialIconsMarkup();
        }
    );

    context.subscriptions.push(disposable);
}

const generateMaterialIconsMarkup = (): string => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <title>Material Icons</title>
    </head>
    <body>
        <h1>Material Icons</h1>
        <ul>
        ${materialIconNames
            .map(mi => {
                return `<li><i class="material-icons">${mi}</i><span>${mi}</span></li>`;
            })
            .join("")}
        </ul>

    </body>
    </html>
    `;
};
export function deactivate() {}
