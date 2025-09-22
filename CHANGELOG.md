# Change Log

All notable changes to the "EnvShield" extension will be documented in this file.

## [0.0.1] - 2025-09-21

### Added
- Initial release of EnvShield
- Visual masking of environment variable values in `.env*` files
- Toggle command to enable/disable masking (`envShield.toggle`)
- Status bar indicator showing masking state
- Configuration options:
  - `envShield.enabled` - Master enable/disable
  - `envShield.maskOnStartup` - Apply masking on activation
  - `envShield.maskChar` - Customizable mask character (default: `•`)
  - `envShield.whitelistKeys` - Keys to exclude from masking (default: `["NODE_ENV"]`)
  - `envShield.extraFileGlobs` - Additional file patterns to mask
- Real-time masking updates when document changes
- Debounced updates for performance
- Support for dotenv file format with proper regex parsing
- Visual-only masking (file content remains unchanged)