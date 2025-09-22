import * as vscode from "vscode";

const ENV_REGEX = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/;

export function computeEnvMaskDecorations(
  document: vscode.TextDocument,
  whitelist: Set<string>,
  maskChar: string,
  languageId: string,
  extraGlobs: string[]
): vscode.DecorationOptions[] {
  // Check if this file should be processed
  if (!shouldProcessFile(document, languageId, extraGlobs)) {
    return [];
  }

  const decorations: vscode.DecorationOptions[] = [];
  const lineCount = document.lineCount;

  for (let lineIndex = 0; lineIndex < lineCount; lineIndex++) {
    const line = document.lineAt(lineIndex);
    const text = line.text;

    // Skip comments and blank lines
    if (text.trim().startsWith("#") || text.trim() === "") {
      continue;
    }

    const match = text.match(ENV_REGEX);
    if (!match) {
      continue;
    }

    const [, key, value] = match;

    // Skip whitelisted keys
    if (whitelist.has(key)) {
      continue;
    }

    // Skip empty values
    if (!value || value.trim() === "") {
      continue;
    }

    // Find the position of the value part
    const equalIndex = text.indexOf("=");
    if (equalIndex === -1) {
      continue;
    }

    // Find start of value (skip whitespace after =)
    let valueStart = equalIndex + 1;
    while (valueStart < text.length && text[valueStart] === " ") {
      valueStart++;
    }

    // If no value after spaces, skip
    if (valueStart >= text.length) {
      continue;
    }

    const valueEnd = text.length;
    const valueLength = valueEnd - valueStart;

    // Create range for the value part
    const range = new vscode.Range(lineIndex, valueStart, lineIndex, valueEnd);

    // Create mask overlay
    const maskText = maskChar.repeat(valueLength);

    const decoration: vscode.DecorationOptions = {
      range,
      renderOptions: {
        after: {
          contentText: maskText,
          color: new vscode.ThemeColor("editor.foreground"),
        },
      },
    };

    decorations.push(decoration);
  }

  return decorations;
}

function shouldProcessFile(
  document: vscode.TextDocument,
  languageId: string,
  extraGlobs: string[]
): boolean {
  const fileName = document.fileName;
  const baseName = fileName.split("/").pop() || "";

  console.log(
    "EnvShield: Checking file:",
    fileName,
    "baseName:",
    baseName,
    "languageId:",
    document.languageId
  );

  // Check if it's a dotenv file by language ID
  if (document.languageId === "dotenv") {
    console.log("EnvShield: File detected by language ID");
    return true;
  }

  // Check if it matches the target language
  if (languageId === "dotenv" && document.languageId === languageId) {
    console.log("EnvShield: File detected by target language");
    return true;
  }

  // Check if it's a .env* file by filename pattern
  if (baseName.startsWith(".env")) {
    console.log("EnvShield: File detected by filename pattern");
    return true;
  }

  // Check extra globs if provided
  if (extraGlobs.length > 0) {
    for (const glob of extraGlobs) {
      if (fileName.includes(glob.replace("*", ""))) {
        console.log("EnvShield: File detected by extra glob");
        return true;
      }
    }
  }

  console.log("EnvShield: File not processed");
  return false;
}

export function createMaskDecorationType(): vscode.TextEditorDecorationType {
  return vscode.window.createTextEditorDecorationType({
    opacity: "0",
  });
}
