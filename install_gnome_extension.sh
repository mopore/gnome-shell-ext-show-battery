#!/usr/bin/env bash
set -euo pipefail

printf "This will install the extension on your Gnome-base system and \n"
printf "you will manually have enable it an reload the shell\n\n"
read -p "Do you want to continue? [y/N] " response
if [[ ! "$response" =~ ^[Yy]$ ]];
then
    echo "Exiting..."
    exit 1
fi

GNOME_EXTENSION_NAME="gnome-shell-ext-show-battery@mopore.org"

rm -rf "$HOME"/.local/share/gnome-shell/extensions/"$GNOME_EXTENSION_NAME"
cp -rv "$GNOME_EXTENSION_NAME" "$HOME"/.local/share/gnome-shell/extensions/"$GNOME_EXTENSION_NAME"

printf "\n\n"
echo "Restart Gnome Shell (Alt + F2, r, Enter) to apply changes."
echo "Then, enable the extension in Gnome Tweaks."
