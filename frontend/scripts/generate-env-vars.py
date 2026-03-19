#!/usr/bin/env python3

import json
from pathlib import Path

# Read upload results
results_file = Path(__file__).parent / "cloudinary-upload-results.json"
with open(results_file, 'r') as f:
    results = json.load(f)

# Generate environment variables
env_vars = []
env_vars.append(f"VITE_RESUME_URL={results['resume']['url']}")

for i, cert in enumerate(results["certificates"], 1):
    env_vars.append(f"VITE_CERT_{i}={cert['url']}")

# Save to .env file
env_file = Path(__file__).parent.parent / ".env"
existing_env = env_file.read_text()

# Extract non-certificate lines
lines = existing_env.split('\n')
filtered_lines = [line for line in lines if not line.startswith('VITE_RESUME') and not line.startswith('VITE_CERT')]

# Add new certificate URLs
filtered_lines.extend(env_vars)

# Write back
env_file.write_text('\n'.join(filtered_lines).strip() + '\n')

print(f"✅ Updated .env with {len(env_vars)} environment variables")
print(f"   - 1 resume URL")
print(f"   - {len(env_vars)-1} certificate URLs")
