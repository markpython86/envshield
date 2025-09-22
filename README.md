# EnvShield – Stream-Safe .env Masking

EnvShield is a Visual Studio Code extension that protects you from accidentally revealing sensitive environment variables during live streams, screen shares, or recordings. It visually masks values inside `.env*` files, giving you peace of mind while keeping your workflow unchanged.

---

## Preview

**Masking Enabled**  
![EnvShield Enabled](images/envshield-preview-enabled.png)

**Masking Disabled**  
![EnvShield Disabled](images/envshield-preview-disabled.png)

**How to Enable Masking**  
![How to Enable EnvShield](images/envshield-preview-how-to-enable.png)

---

## Features

- 🔒 **Visual Masking** – Obscures environment variable values using customizable characters.  
- 👁️ **Toggle Control** – Enable or disable masking instantly via a command or status bar item.  
- 📋 **Whitelist Support** – Exempt specific keys (e.g., `NODE_ENV`) from masking.  
- 🎯 **Smart Detection** – Works automatically with `.env`, `.env.local`, `.env.production`, and more.  
- ⚡ **Real-time Updates** – Masks update dynamically as you type or edit.  
- 🎨 **Status Bar Indicator** – Clearly shows whether masking is active.  

---

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `envShield.enabled` | boolean | `true` | Master enable/disable for EnvShield |
| `envShield.maskOnStartup` | boolean | `true` | Apply masking automatically on startup |
| `envShield.maskChar` | string | `"•"` | Character used for masking (first character only) |
| `envShield.whitelistKeys` | array | `["NODE_ENV"]` | Keys that will not be masked |
| `envShield.extraFileGlobs` | array | `[]` | Additional file patterns to apply masking to |

---

## Commands

- **EnvShield: Toggle Masking** (`envShield.toggle`) – Toggle masking on/off with one click or command.

---

## Usage

1. Open any `.env*` file.  
2. Masking is automatically applied (if enabled).  
3. Use the status bar item or run **EnvShield: Toggle Masking** from the Command Palette to switch masking on/off.  
4. Adjust settings and whitelist keys to fit your workflow.  

---

## Example

**Before Masking**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=sk-1234567890abcdef
NODE_ENV=development
SECRET_TOKEN=super-secret-value
```

**After Masking**

```env
DATABASE_URL=••••••••••••••••••••••••••••••••••••••••••••••••••
API_KEY=••••••••••••••••••••
NODE_ENV=development
SECRET_TOKEN=••••••••••••••••••
```

---

## Important Notes

⚠️ **EnvShield provides *visual masking only*.**  
- Actual file content remains unchanged.  
- Secret values can still be copied, searched, or viewed in source control diffs.  
- This is a convenience tool for streaming/sharing, not a security measure.  
- For real security, use `.env.example` files with placeholder values.  

---

## Development

To build and test EnvShield locally:

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes during development
npm run watch

# Package extension into a .vsix file
npm run package
```

Run the extension in a VS Code Extension Development Host using **F5**.

---

## License

MIT License © 2025  

---

## Contributing

Contributions are welcome!  
Open an [issue](https://github.com/markpython86/envshield/issues) or submit a pull request on GitHub to suggest improvements, report bugs, or add features.
