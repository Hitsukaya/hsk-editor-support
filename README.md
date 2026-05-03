# HSK Language Support (VS Code)

HSK (Hitsukaya System Kernel) is a custom systems language designed for infrastructure automation, runtime validation, and deterministic execution.

This extension provides basic editor support for HSK in Visual Studio Code.

---

## Features

- Syntax highlighting for HSK
- Support for:
  - `system`, `unit`, `command`, `function`
  - `metadata`, `sequence`, `stage`
  - Control flow: `if`, `while`, `for`, `switch`
  - Runtime instructions: `inspect`, `exec`, `shell`, `report`, `bind`
  - Typed blocks: `string`, `int`, `long`, `bool`, `state`
- Snippets for fast development
- Clean structure aligned with HSK AST & parser

---

## Installation (Development)

1. Clone repository:
```bash
git clone https://github.com/Hitsukaya/hsk-vscode
cd hsk-vscode
npm install
npx tsc
vsce package
code --install-extension hsk-language-0.0.2.vsix

