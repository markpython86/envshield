import * as vscode from "vscode";
import { getSettings, onSettingsChanged, EnvShieldSettings } from "./settings";
import { computeEnvMaskDecorations, createMaskDecorationType } from "./masker";
import { StatusBarManager } from "./statusBar";

let maskDecorationType: vscode.TextEditorDecorationType;
let statusBarManager: StatusBarManager;
let settings: EnvShieldSettings;
let documentChangeTimeout: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
  // Initialize components
  maskDecorationType = createMaskDecorationType();
  statusBarManager = new StatusBarManager();
  settings = getSettings();

  // Register command
  const toggleCommand = vscode.commands.registerCommand(
    "envShield.toggle",
    () => {
      const newState = statusBarManager.toggle();
      if (newState) {
        applyMaskingToActiveEditor();
      } else {
        clearMaskingFromActiveEditor();
      }
    }
  );

  // Register event handlers
  const onActiveEditorChanged = vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor && settings.enabled && statusBarManager.getEnabled()) {
        applyMaskingToEditor(editor);
      }
    }
  );

  const onDocumentChanged = vscode.workspace.onDidChangeTextDocument(
    (event) => {
      const activeEditor = vscode.window.activeTextEditor;
      if (activeEditor && activeEditor.document === event.document) {
        debouncedApplyMasking(activeEditor);
      }
    }
  );

  const onConfigChanged = onSettingsChanged(() => {
    settings = getSettings();
    statusBarManager.setEnabled(settings.enabled);
    if (settings.enabled && statusBarManager.getEnabled()) {
      applyMaskingToActiveEditor();
    } else {
      clearMaskingFromActiveEditor();
    }
  });

  // Apply initial masking if enabled
  if (settings.enabled && settings.maskOnStartup) {
    applyMaskingToActiveEditor();
  }

  // Set initial status bar state
  statusBarManager.setEnabled(settings.enabled);

  // Register disposables
  context.subscriptions.push(
    toggleCommand,
    onActiveEditorChanged,
    onDocumentChanged,
    onConfigChanged,
    maskDecorationType,
    statusBarManager
  );
}

function applyMaskingToActiveEditor(): void {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    applyMaskingToEditor(activeEditor);
  }
}

function applyMaskingToEditor(editor: vscode.TextEditor): void {
  if (!settings.enabled || !statusBarManager.getEnabled()) {
    console.log(
      "EnvShield: Masking disabled - settings.enabled:",
      settings.enabled,
      "statusBarManager.getEnabled():",
      statusBarManager.getEnabled()
    );
    return;
  }

  const decorations = computeEnvMaskDecorations(
    editor.document,
    settings.whitelistKeys,
    settings.maskChar,
    "dotenv",
    settings.extraFileGlobs
  );

  console.log(
    "EnvShield: Applying",
    decorations.length,
    "decorations to",
    editor.document.fileName
  );
  editor.setDecorations(maskDecorationType, decorations);
}

function clearMaskingFromActiveEditor(): void {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    activeEditor.setDecorations(maskDecorationType, []);
  }
}

function debouncedApplyMasking(editor: vscode.TextEditor): void {
  if (documentChangeTimeout) {
    clearTimeout(documentChangeTimeout);
  }

  documentChangeTimeout = setTimeout(() => {
    applyMaskingToEditor(editor);
    documentChangeTimeout = undefined;
  }, 100);
}

export function deactivate() {
  if (documentChangeTimeout) {
    clearTimeout(documentChangeTimeout);
  }
}
