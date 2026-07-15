# 🔌 HSK VS Code Extension (Official Developer Tooling)

The official IDE development suite for the HSK ecosystem. This extension brings native syntax highlighting, code snippets, and structural language support for **HSK** (`.hsk`), **HSKON** (`.hskon`), and **HCONF** (`.hconf`) files in Visual Studio Code.

This tooling is designed to optimize Developer Experience (DX) and ensure fast, predictable, and error-free system-architecture writing.

---

## 🛠️ Repository Status: Active R&D

This repository hosts the source code for the VS Code extension package. It includes AST grammars and JSON configurations that enable Visual Studio Code to natively understand the unique structure of the Hitsukaya System Kernel syntax.

---

## 📂 Repository Structure

The extension is modularly built following standard VS Code extension practices:

*   **`syntaxes/`**: Contains the TextMate grammars (`.tmLanguage.json`) that power high-accuracy colorization for native HSK keywords, system-unit hierarchies, and strict data types.
*   **`snippets/`**: Preconfigured, rapid-insertion templates for fast scaffolding of `system -> unit -> command` structures and database configurations.
*   **`language-configuration.json`**: Auto-closing brackets, comments, and folding rules mapped precisely to the HSK grammar.
*   **`src/`**: Extension entry point and active runtime utilities for checking code semantics on local workspaces.

---

## 🧠 Live Compiler Integration (AST Diagnostics)

Unlike basic extension wrappers that only handle coloring, this extension natively hooks into your local HSK installation to provide real-time diagnostic reporting. 

Upon saving any file inside VS Code, the extension automatically spins up the native compiler diagnostics suite:

*   **For `.hsk`**: Executes `/usr/local/bin/hsk --analyze`
*   **For `.hconf`**: Executes `/usr/local/bin/hsk --hconf-parse`
*   **For `.hskon`**: Executes `/usr/local/bin/hsk --hskon-parse`

The AST engine outputs validation warnings and errors, which are parsed line-by-line and populated directly into VS Code's **Problems** pane in real-time.

---

## ✨ Features Included

1.  **Rigid Syntax Highlighting:** Distinct visual markers for systems-level declarations, system calls, security flags, and native data structures.
2.  **Custom Snippets:** Instant templates for server definitions, routing files for KUMO, system checkers for Doragon, and data schemes for Monica.
3.  **AST-Friendly Parsing:** Built to complement the strict validation rules of the native HSK compiler core directly in your favorite code editor.

---

## 🚀 How to Install (Local Dev Build)

Currently, the extension is in preview mode. To test it locally in your VS Code environment:

1. Clone this repository into your local `.vscode/extensions/` directory:
   ```bash
   git clone [https://github.com/Hitsukaya/hsk-vscode-extension.git](https://github.com/Hitsukaya/hsk-vscode-extension.git)

## HSK Language

HSK (Hitsukaya System Kernel) support for Visual Studio Code.

## Overview

HSK is a system-level language designed for runtime control, validation and structured execution.

This extension provides basic editor support for HSK ecosystem files.

## Supported

- `.hsk`
- `.hskon`
- `.hconf`

## Features

- Syntax highlighting
- Snippets for core HSK structures
- Basic support for Kumo configuration

## Status

Early stage.

No autocomplete.
No validation.
No language server.

Only syntax and snippets.

## Notes

HSK is not intended to follow traditional scripting models.
It is designed for controlled, structured execution with strict validation.

## Publisher

Hitsukaya

---

## Installation (Development)

1. Clone repository:
   
   ```bash
   git clone https://github.com/Hitsukaya/hsk-vscode
   cd hsk-vscode
   npm install
   npx tsc
   npm run compile
   vsce package
   code --install-extension hsk-language.vsix
   ```

## ⌨️ Nano Editor Support (`.nanorc`)

For system administrators working directly inside UNIX terminals over SSH, we provide native syntax highlighting rules for the **Nano** editor.

### Installation:
1. Copy the HSK syntax files to your nano user directory:
   ```bash
   mkdir -p ~/.nano
   cp nano/*.nanorc ~/.nano/
