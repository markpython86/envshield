import * as vscode from 'vscode';

export interface EnvShieldSettings {
    enabled: boolean;
    maskOnStartup: boolean;
    maskChar: string;
    whitelistKeys: Set<string>;
    extraFileGlobs: string[];
}

export function getSettings(): EnvShieldSettings {
    const config = vscode.workspace.getConfiguration('envShield');

    const maskChar = config.get<string>('maskChar', '•');
    const whitelistKeys = new Set(config.get<string[]>('whitelistKeys', ['NODE_ENV']));

    return {
        enabled: config.get<boolean>('enabled', true),
        maskOnStartup: config.get<boolean>('maskOnStartup', true),
        maskChar: maskChar.length > 0 ? maskChar[0] : '•',
        whitelistKeys,
        extraFileGlobs: config.get<string[]>('extraFileGlobs', [])
    };
}

export function onSettingsChanged(callback: () => void): vscode.Disposable {
    return vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('envShield')) {
            callback();
        }
    });
}