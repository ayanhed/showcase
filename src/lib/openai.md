# Model Switching Configuration

This document explains how to easily switch between different OpenAI models for testing and development purposes.

## Available Model Profiles

### Production (Default)

- **Text Model**: `gpt-4o-mini`
- **Image Model**: `dall-e-3`
- **Max Tokens**: 300
- **Temperature**: 0.5
- **Use Case**: Production-ready, cost-effective

### Designer (Recommended)

- **Text Model**: `gpt-4o`
- **Image Model**: `dall-e-3`
- **Max Tokens**: 600
- **Temperature**: 0.6
- **Use Case**: Highest quality spec + UI prompt generation for design fidelity

### Fast

- **Text Model**: `gpt-3.5-turbo`
- **Image Model**: `dall-e-2`
- **Max Tokens**: 200
- **Temperature**: 0.3
- **Use Case**: Quick testing, lower cost

### Quality

- **Text Model**: `gpt-4o`
- **Image Model**: `dall-e-3`
- **Max Tokens**: 500
- **Temperature**: 0.7
- **Use Case**: Higher quality outputs, more creative

### Rapid

- **Text Model**: `gpt-3.5-turbo`
- **Image Model**: `dall-e-2`
- **Max Tokens**: 150
- **Temperature**: 0.1
- **Use Case**: Ultra-fast testing, most deterministic

## How to Switch Models

### Method 1: Environment Variable (Persistent)

Set the `OPENAI_MODEL_PROFILE` environment variable:

```bash
# For development
export OPENAI_MODEL_PROFILE=designer

# For production (balanced cost)
export OPENAI_MODEL_PROFILE=production

# For high-quality testing (alternate)
export OPENAI_MODEL_PROFILE=quality
```

### Method 2: Runtime Switching (Temporary)

Use the utility functions in your code:

```typescript
import { switchModel, getCurrentModelInfo } from "./lib/openai";

// Switch to fast model
switchModel("fast");

// Check current configuration
const config = getCurrentModelInfo();
console.log(config);
```

### Method 3: UI Component (Interactive)

The `ModelSwitcher` component is available on the quote page for interactive testing.

## API Usage

```typescript
import {
  switchModel,
  getCurrentModelInfo,
  listAvailableModels,
  getModelConfig,
} from "./lib/openai";

// List all available model profiles
const profiles = listAvailableModels(); // ['production', 'fast', 'quality', 'rapid']

// Get configuration for a specific profile
const config = getModelConfig("fast");

// Switch models
switchModel("quality");

// Get current configuration
const current = getCurrentModelInfo();
```

## Cost Considerations

- **Production**: Balanced cost and quality
- **Fast**: Lowest cost, suitable for testing
- **Quality**: Higher cost, best quality
- **Rapid**: Low cost, fastest response

## Notes

- Model switching is instant and affects all subsequent API calls
- The configuration is stored in memory and resets on page reload
- Use environment variables for persistent configuration
- Console logs will show which model is being used for each request
