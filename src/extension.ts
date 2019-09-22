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
        <style>

        .icon-name {
        }

        .icon i.material-icons {
            padding: 2px 6px;
            font-size: 34pt;
        }

        .hidden {
            display: none;
        }

        </style>
    </head>
    <body>
        <h1>Material Icons</h1>
        <input oninput="handleInputChange(this.value)" type="text"/>
        <table>
        <thead>
            <tr>
            <td>icon</td>
            <td>icon_name</td>
            </tr>
        </thead>
            <tbody>
            ${materialIconNames
                .map(mi => {
                    return `
                        <tr data-icon-name="${mi}" >
                            <td class="icon">
                                <i class="material-icons">${mi}</i>
                            </td>
                            <td class="icon-name">
                                ${mi}
                            </td>
                        </tr>
                    `;
                })
                .join("")}
            </tbody>
        </table>
        <script>
        function handleInputChange(searchTerm){
            console.log(searchTerm);
            document.querySelectorAll("tr").forEach(element => {
                var iconName = element.getAttribute("data-icon-name");
                if (iconName){
                    if (searchTerm == ""){
                        element.classList.remove("hidden");
                    } else if (iconName.includes(searchTerm) ){
                        element.classList.remove("hidden");
                    } else {
                        element.classList.add("hidden");
                    }
                }
            });
        }
        </script>
    </body>
    </html>
    `;
};
export function deactivate() {}
