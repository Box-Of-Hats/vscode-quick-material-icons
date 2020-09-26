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
                vscode.ViewColumn.Two,
                {
                    enableScripts: true,
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
            font-size: 1.1rem;
        }

        .icon i.material-icons {
            padding: 2px 6px;
            font-size: 1.8rem;
        }

        .hidden {
            display: none;
        }

        input {
            width: 90%;
            font-size: 1.5rem;
            margin: 4px 0;
            padding: 4px 8px;
            font-family: "Arial";
            outline: 0;
            border-radius: 4px;
            border: 2px solid rgba(40,40,40,0.7);
        }

        body.vscode-dark input {
            background: rgba(0,0,0,0.1);
            color: rgba(255,255,255,0.8);
        }

        body.vscode-light input {
            background: rgba(0,0,0,0.1);
            color: rgba(0,0,0,0.8);
        }

        th {
            font-size: 1.3rem;
        }

        input:focus {
            outline: 0;
        }

        tr {
            margin: 20px 4px;
        }

        .results {
            overflow:scroll;
            max-height: 90vh;
        }

        </style>
    </head>
    <body>
        <h1>Material Icons</h1>
        <input oninput="handleInputChange(this.value)" placeholder="Search" type="text"/>
        <div class="results">
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
        </div>
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

        (function(){
            document.querySelector('input').focus();
        })()

        </script>
    </body>
    </html>
    `;
};
export function deactivate() {}
