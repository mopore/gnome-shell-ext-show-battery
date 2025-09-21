```
 ____        _     _                   _   ____  _                            
| __ )  __ _| |_  | |    _____   _____| | / ___|| |__   _____      _____ _ __ 
|  _ \ / _` | __| | |   / _ \ \ / / _ \ | \___ \| '_ \ / _ \ \ /\ / / _ \ '__|
| |_) | (_| | |_  | |__|  __/\ V /  __/ |  ___) | | | | (_) \ V  V /  __/ |   
|____/ \__,_|\__| |_____\___| \_/ \___|_| |____/|_| |_|\___/ \_/\_/ \___|_|   
                                                                              
```

<img width="657" alt="screenhot" src="https://github.com/mopore/gnome-shell-ext-show-battery/assets/56848419/75344a59-d96c-4ce2-ab53-929682adebee">

This project solves to problem to see the battery level of a MacOS laptop from 
inside a VM which runs with Gnome 46 or higher.

The project contains of two parts.
- A Go-based user agent to provide the battery level
- A Gnome extension for displaying

As of 2024-05 showing the hosts's battery level is not yet supported with 
UTM/qemu. For the communication a simple file is used which needs to be 
accessible from both the MacOS host and the Gnome 46 (or higher) shell.

Per default the file is expected to be at the following location: 
`/home/jni/arch_share/virt_machine/jni_ext/battery_level_percent.txt`

## Shell Extension
The Gnome shell extension is to show the content of a file which is meant to hold
the current level of the laptop's battery.
For more details see the README.md in the corresponding directory.
For the Shell Extension there is an install script (`install_gnome_extension.sh`) in 
the root directory and the option to set the file path from the extension's settings.

## User Agent / Go Program
The Go based user agent propagates the battery level every minute with a MacOS
user agent to the file (on the host).
Use the correspinding installer.

For changing the path you might want to change the installer script and 
the source code file `main.go`.

