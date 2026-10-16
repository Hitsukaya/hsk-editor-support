# HSK syntax highlighting for nano

Author: Valentin Hitsukaya

| File | Extension |
| --- | --- |
| `hsk.nanorc` | `.hsk` |
| `hconf.nanorc` | `.hconf` |
| `hskon.nanorc` | `.hskon` |

## Installation

Run from the repository root:

```sh
mkdir -p ~/.config/nano
cp nano/*.nanorc ~/.config/nano/
```

Add the following lines once to `~/.nanorc`:

```nanorc
include "~/.config/nano/hsk.nanorc"
include "~/.config/nano/hconf.nanorc"
include "~/.config/nano/hskon.nanorc"
```

Reopen a matching file in nano. Installing these rules does not require the HSK runtime.

## Highlighting

HSK rules cover the supplied language keywords and Kumo vocabulary, numbers, operators, strings and comments. Later matching rules take precedence.

HCONF and HSKON rules highlight identifiers generically, strings, numbers, booleans and their respective structural separators. They do not depend on application-specific key names.

These files provide syntax highlighting. HSK runtime validation remains separate.
