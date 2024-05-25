```
 ____        _     _                   _   ____  _                            
| __ )  __ _| |_  | |    _____   _____| | / ___|| |__   _____      _____ _ __ 
|  _ \ / _` | __| | |   / _ \ \ / / _ \ | \___ \| '_ \ / _ \ \ /\ / / _ \ '__|
| |_) | (_| | |_  | |__|  __/\ V /  __/ |  ___) | | | | (_) \ V  V /  __/ |   
|____/ \__,_|\__| |_____\___| \_/ \___|_| |____/|_| |_|\___/ \_/\_/ \___|_|   
                                                                              
```
This is a Gnome 46 shell extension to show the content of a file which is 
meant to hold the current level of the battery. The Use Case ist to have this
extension installed in a Gnome environment inside a VM which does not have
direct access to the host's battery level.

## Setup
This extension needs to be placed under the following directory:
```bash
~/.local/share/gnome-shell/extensions/
```

## Change entry for settings / preferences
To Make changes on the preferences/settings available the schema under "schemas"
needs to be recompiled with:
```bash
glib-compile-schemas schemas
```

## GTK Widget Gallery
https://gnome.pages.gitlab.gnome.org/libadwaita/doc/1-latest/widget-gallery.html


## Check the Gnome Shell log
```bash
journalctl -f -o cat /usr/bin/gnome-shell
```
