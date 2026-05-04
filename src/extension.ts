import * as vscode from "vscode";
import { exec } from "child_process";

let diagnostics: vscode.DiagnosticCollection;

export function activate(context: vscode.ExtensionContext) {
  diagnostics = vscode.languages.createDiagnosticCollection("hsk");
  context.subscriptions.push(diagnostics);
  
  vscode.workspace.onDidSaveTextDocument((document) => {
    validateDocument(document);
  });

  vscode.workspace.textDocuments.forEach(validateDocument);
}

function validateDocument(document: vscode.TextDocument) {
  const filePath = document.fileName;
  const lang = document.languageId;

  let command = "";

  if (lang === "hsk") {
    command = `/usr/local/bin/hsk --analyze "${filePath}"`;
  } else if (lang === "hconf") {
    command = `/usr/local/bin/hsk --hconf-parse "${filePath}"`;
  } else if (lang === "hskon") {
    command = `/usr/local/bin/hsk --hskon-parse "${filePath}"`;
  } else {
    return;
  }

exec(command, (error: any, stdout: string, stderr: string) => {
    const output = stdout + stderr;

    const diagnosticsList: vscode.Diagnostic[] = [];

    const lines = output.split("\n");

    for (const line of lines) {
     
      const match = line.match(/line\s+(\d+).*?:\s+(.*)/i);

      if (match) {
        const lineNum = parseInt(match[1]) - 1;
        const message = match[2];

        const range = new vscode.Range(
          lineNum,
          0,
          lineNum,
          document.lineAt(lineNum).text.length
        );

        const diagnostic = new vscode.Diagnostic(
          range,
          message,
          vscode.DiagnosticSeverity.Error
        );

        diagnosticsList.push(diagnostic);
      }
    }

    diagnostics.set(document.uri, diagnosticsList);
  });
}

export function deactivate() {}