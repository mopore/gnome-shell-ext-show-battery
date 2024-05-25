#!/usr/bin/env bash
set -euo pipefail

GNOME_EXTENSION_NAME="gnome-46-shell-ext-show-battery@mopore.org"

rm -rf "$HOME"/.local/share/gnome-shell/extensions/"$GNOME_EXTENSION_NAME"
cp -rv "$GNOME_EXTENSION_NAME" "$HOME"/.local/share/gnome-shell/extensions/"$GNOME_EXTENSION_NAME"

printf "\n\n"
echo "Restart Gnome Shell (Alt + F2, r, Enter) to apply changes."
echo "Then, enable the extension in Gnome Tweaks."
