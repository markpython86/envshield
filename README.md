# EnvShield – Stream-Safe .env Masking

EnvShield is a VS Code extension that visually masks values in `.env*` files to prevent accidental exposure of sensitive information during screen sharing, streaming, or recording.

![EnvShield Demo](https://via.placeholder.com/600x300?text=EnvShield+Demo+GIF)
*GIF placeholder - shows before/after of masked .env values*

## Features

- 🔒 **Visual Masking**: Masks environment variable values with customizable characters
- 👁️ **Toggle Control**: Easily toggle masking on/off with a command or status bar click
- 📋 **Whitelist Support**: Exclude specific keys (like `NODE_ENV`) from masking
- 🎯 **Smart Detection**: Automatically works with `.env`, `.env.local`, `.env.production`, etc.
- ⚡ **Real-time Updates**: Masks update automatically as you type
- 🎨 **Status Bar Indicator**: Shows current masking state at a glance

## Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `envShield.enabled` | boolean | `true` | Master enable/disable for EnvShield |
| `envShield.maskOnStartup` | boolean | `true` | Apply masking when VS Code starts |
| `envShield.maskChar` | string | `"•"` | Character used for masking (first character only) |
| `envShield.whitelistKeys` | array | `["NODE_ENV"]` | Environment variable keys that won't be masked |
| `envShield.extraFileGlobs` | array | `[]` | Additional file patterns to apply masking to |

## Commands

- **EnvShield: Toggle Masking** (`envShield.toggle`) - Toggle masking on/off

## Usage

1. Open any `.env*` file
2. Values will be automatically masked (if enabled)
3. Click the status bar item or use the command palette to toggle masking
4. Configure whitelist and settings as needed

## Important Security Notes

⚠️ **This extension provides VISUAL masking only!**

- The actual file content remains unchanged
- Values are still present in memory and can be copied
- This is NOT a security feature - it's a convenience tool for streaming/sharing
- For true security, use example files (`.env.example`) with dummy values

## Example

Before masking:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_KEY=sk-1234567890abcdef
NODE_ENV=development
SECRET_TOKEN=super-secret-value
```

After masking:
```env
DATABASE_URL=••••••••••••••••••••••••••••••••••••••••••••••••••
API_KEY=••••••••••••••••••••
NODE_ENV=development
SECRET_TOKEN=••••••••••••••••••
```

## Development

To work on this extension:

```bash
# Clone and install dependencies
npm install

# Compile TypeScript
npm run compile

# Watch for changes
npm run watch

# Package extension
npm run package
```

## License

MIT

## Contributing

Issues and pull requests welcome on GitHub!