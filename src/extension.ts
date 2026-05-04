import * as vscode from "vscode";
import { execFile } from "child_process";

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

  let args: string[] = [];

  if (lang === "hsk") {
    args = ["--analyze", filePath];
  } else if (lang === "hconf") {
    args = ["--hconf-parse", filePath];
  } else if (lang === "hskon") {
    args = ["--hskon-parse", filePath];
  } else {
    diagnostics.delete(document.uri);
    return;
  }

  execFile("hsk", args, (error, stdout, stderr) => {
    const output = stdout + stderr;
    const diagnosticsList: vscode.Diagnostic[] = [];

    for (const line of output.split(/\r?\n/)) {
      const match = line.match(
        /^(warning|error|note)\|([^|]+)\|(\d+)\|(\d+)\|(\d+)\|(\d+)\|(.*)$/i
      );

      if (!match) {
        continue;
      }

      const kind = match[1].toLowerCase();
      const code = match[2];

      // Ignore success/info notes such as:
      // note|HSK0000|...|The file is valid up to this point.|Okay, continue.
      if (kind === "note" || code === "HSK0000") {
        continue;
      }

      const lineNum = Math.max(parseInt(match[3], 10) - 1, 0);
      const colNum = Math.max(parseInt(match[4], 10) - 1, 0);
      const message = match[7];

      if (lineNum >= document.lineCount) {
        continue;
      }

      const textLine = document.lineAt(lineNum);
      const start = Math.min(colNum, textLine.text.length);
      const end = Math.min(Math.max(start + 1, textLine.text.length), textLine.text.length);

      const severity =
        kind === "error"
          ? vscode.DiagnosticSeverity.Error
          : kind === "warning"
          ? vscode.DiagnosticSeverity.Warning
          : vscode.DiagnosticSeverity.Information;

      const diagnostic = new vscode.Diagnostic(
        new vscode.Range(lineNum, start, lineNum, end),
        message,
        severity
      );

      diagnostic.code = code;
      diagnostic.source = "HSK";

      diagnosticsList.push(diagnostic);
    }

    if (diagnosticsList.length === 0) {
      diagnostics.delete(document.uri);
    } else {
      diagnostics.set(document.uri, diagnosticsList);
    }
  });
}

export function deactivate() {
  diagnostics?.dispose();
}
