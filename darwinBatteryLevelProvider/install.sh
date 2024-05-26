#!/usr/bin/env bash

printf "This will install a user agent on your system and \n"
printf "create a directory \"arch_share\" in your home directory\n\n"
read -p "Do you want to continue? [y/N] " response
if [[ ! "$response" =~ ^[Yy]$ ]];
then
    echo "Exiting..."
    exit 1
fi

go build -o write_battery_level ./main.go

mkdir -p "$HOME/arch_share/virt_machine/jni_ext"

cp write_battery_level "$HOME/arch_share/virt_machine/jni_ext"

cp com.jni.updatebatterylevel.plist "$HOME/Library/LaunchAgents"
launchctl load "$HOME/Library/LaunchAgents/com.jni.updatebatterylevel.plist"

echo "Battery level agent installed"

# Check with launchctl list | grep jni
