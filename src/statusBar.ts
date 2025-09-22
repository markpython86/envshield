import * as vscode from "vscode";

export class StatusBarManager {
  private statusBarItem: vscode.StatusBarItem;
  private isEnabled: boolean = true;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Right,
      100
    );

    this.statusBarItem.command = "envShield.toggle";
    this.statusBarItem.tooltip = "Click to toggle EnvShield masking";
    this.updateStatusBar();
    this.statusBarItem.show();
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    this.updateStatusBar();
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public toggle(): boolean {
    this.isEnabled = !this.isEnabled;
    this.updateStatusBar();
    return this.isEnabled;
  }

  private updateStatusBar(): void {
    if (this.isEnabled) {
      this.statusBarItem.text = "$(eye-closed) EnvShield ON";
      this.statusBarItem.backgroundColor = undefined;
    } else {
      this.statusBarItem.text = "$(eye) EnvShield OFF";
      this.statusBarItem.backgroundColor = new vscode.ThemeColor(
        "statusBarItem.warningBackground"
      );
    }
  }

  public dispose(): void {
    this.statusBarItem.dispose();
  }
}
