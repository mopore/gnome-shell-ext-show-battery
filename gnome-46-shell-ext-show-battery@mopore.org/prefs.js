import Gio from 'gi://Gio';
import Adw from 'gi://Adw';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';


export default class ExamplePreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const coreGroup = new Adw.PreferencesGroup({
            title: _('Core Settings'),
            description: _('Configure the core settings of the extension'),
        });
        page.add(coreGroup);

        const entryRow = new Adw.EntryRow({
            title: _('Battery Info Path'),
        });
        coreGroup.add(entryRow);

        const appearanceGroup = new Adw.PreferencesGroup({
            title: _('Appearance'),
            description: _('Configure the appearance of the extension'),
        });
        page.add(appearanceGroup);

        const switchRow = new Adw.SwitchRow({
            title: _('Show Indicator'),
            subtitle: _('Whether to show the panel indicator'),
        });
        appearanceGroup.add(switchRow);


        // Make bindings between the settings and the UI elements
        window._settings = this.getSettings();

        window._settings.bind('show-indicator', switchRow, 'active',
            Gio.SettingsBindFlags.DEFAULT);

        window._settings.bind('bat-info-path', entryRow, 'text',
            Gio.SettingsBindFlags.DEFAULT);
    }
}
