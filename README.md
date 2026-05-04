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