import Gio from 'gi://Gio';
import St from 'gi://St';
import GLib from 'gi://GLib';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';


const SIXTY_SECONDS = 60;


export default class ShowBatLevelExtension extends Extension {
    enable() {
        console.log('Show Battery Level Extension enabled');

        this._buttonMenu = new PanelMenu.Button(0.0, this.metadata.name, false);

        // Add an icon
        // const icon = new St.Icon({
        //     icon_name: 'face-laugh-symbolic',
        //     style_class: 'system-status-icon',
        // });
        // this._indicator.add_child(icon);

        this._buttonMenuLabel = new St.Label({
            text: 'Hello',
            y_align: 2
        });
        this._buttonMenu.add_child(this._buttonMenuLabel);

        Main.panel.addToStatusArea(this.uuid, this._buttonMenu);

        // Instead of adding our extension to the status area, we want to have
        // it placed in its own section near to the date menu.
        //
        //
        // try {
        //     const dateMenu = Main.panel.statusArea.dateMenu;
        //     const parentContainer = dateMenu.container.get_parent(); // Correct method to get parent
        //     const allPanels = parentContainer.get_children();
        //     const dateMenuIndex = allPanels.indexOf(dateMenu.container);
        //     parentContainer.insert_child_at_index(this._buttonMenu.container, dateMenuIndex + 1); // Correct insertion
        // }
        // catch (e) {
        //     const errMsg = 'Failed to add indicator to date menu: ' + e;
        //     console.error(errMsg);
        //     console.trace();
        // }

        // Add a menu item to open the preferences window
        this._buttonMenu.menu.addAction(_('Preferences'), () => this.openPreferences() );

        // setting to the "visible" property.
        this._settings = this.getSettings();
        this._settings.bind('show-indicator', this._buttonMenu, 'visible',
            Gio.SettingsBindFlags.DEFAULT);

        // Watch for changes to a specific setting
        this._settings.connect('changed::show-indicator', (settings, key) => {
            console.log(`${key} = ${settings.get_value(key).print(true)}`);
        });
        this._settings.connect('changed::bat-info-path', (settings, key) => {
            console.log(`${key} = ${settings.get_value(key).print(true)}`);
        });

        const batInfoPath = this._settings.get_string('bat-info-path');
        console.log(`bat-info-path = ${batInfoPath}`);

        try {
            console.log(`${Main.panel}`);
        }
        catch (e) {
            const errMsg = 'Failed to show notification: ' + e;
            console.error(errMsg);
            console.trace();
        }

        // Update label every minute with file content
        this._updateLabelInterval = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT, SIXTY_SECONDS, () => {
                this.updateLabelWithFileContent();
                return true;
            }
        );

        this.updateLabelWithFileContent();
    }

    updateLabelWithFileContent() {
        console.debug('Updating label with file content');
        const batInfoPath = this._settings.get_string('bat-info-path');

        try {
            const file = Gio.File.new_for_path(batInfoPath);
            file.load_contents_async(null, (f, res) => {
                try {
                    let [success, contents] = f.load_contents_finish(res);
                    if (success) {
                        const newText = `${new TextDecoder().decode(contents).trim()}%`;
                        // TODO Make the pre and postfix configurable
                        // const newText = `${new TextDecoder().decode(contents).trim()}%`;
                        this._buttonMenuLabel.set_text(newText);
                    } else {
                        this._buttonMenuLabel.set_text('n/a');
                    }
                } catch (e) {
                    console.error('Error reading file: ' + e);
                    this._buttonMenuLabel.set_text('n/a');
                }
            });
        } catch (e) {
            console.error('Error setting up file read: ' + e);
            this._buttonMenuLabel.set_text('n/a');
        }
    }


    disable() {
        if (this._updateLabelInterval) {
            GLib.source_remove(this._updateLabelInterval);
            this._updateLabelInterval = null;
        }

        this._buttonMenu?.destroy();
        this._buttonMenu = null;
        this._settings = null;
    }
}
