#!/usr/bin/env python3

import os
import sys
import json
from pathlib import Path

# Install cloudinary if not present
try:
    import cloudinary
    import cloudinary.uploader
except ImportError:
    print("Installing cloudinary SDK...")
    os.system(f"{sys.executable} -m pip install cloudinary -q")
    import cloudinary
    import cloudinary.uploader

# Configuration
cloudinary.config(
    cloud_name="dtvqrkwvv",
    api_key="755174683753774",
    api_secret="S9UTaz76VcO6I97pCnyiI3_jgQk"
)

# Paths
script_dir = Path(__file__).parent
frontend_dir = script_dir.parent
certificates_dir = frontend_dir / "src" / "Certificates"
assets_dir = frontend_dir / "src" / "assets"
cv_path = assets_dir / "CVV.pdf"

def generate_public_id(filename):
    """Generate clean public ID from filename"""
    name = filename.replace('.pdf', '').replace('.PDF', '')
    return name.lower().replace(' ', '-').replace('_', '-')

def upload_files():
    """Upload all files to Cloudinary"""
    print("🚀 Starting Cloudinary upload...\n")
    
    results = {
        "resume": None,
        "certificates": [],
        "errors": []
    }
    
    # Upload resume
    if cv_path.exists():
        print("📄 Uploading resume (CVV.pdf)...")
        try:
            response = cloudinary.uploader.upload(
                str(cv_path),
                resource_type="raw",
                public_id="resume/harshit-singh-cv",
                overwrite=True
            )
            results["resume"] = {
                "url": response.get("secure_url"),
                "size": response.get("bytes"),
                "public_id": response.get("public_id")
            }
            print(f"✅ Resume uploaded successfully")
            print(f"   URL: {response.get('secure_url')}\n")
        except Exception as e:
            print(f"❌ Resume upload failed: {str(e)}\n")
            results["errors"].append({
                "file": "CVV.pdf",
                "error": str(e)
            })
    else:
        print(f"❌ Resume file not found: {cv_path}\n")
        results["errors"].append({
            "file": "CVV.pdf",
            "error": "File not found"
        })
    
    # Upload certificates
    print("📜 Uploading certificates...\n")
    cert_files = sorted([f for f in os.listdir(certificates_dir) if f.lower().endswith('.pdf')])
    
    print(f"Found {len(cert_files)} certificate files.\n")
    
    for i, filename in enumerate(cert_files, 1):
        filepath = certificates_dir / filename
        public_id = f"certificates/{generate_public_id(filename)}"
        
        try:
            print(f"[{i}/{len(cert_files)}] Uploading {filename}...", end=" ", flush=True)
            response = cloudinary.uploader.upload(
                str(filepath),
                resource_type="raw",
                public_id=public_id,
                overwrite=True
            )
            
            results["certificates"].append({
                "fileName": filename,
                "url": response.get("secure_url"),
                "size": response.get("bytes"),
                "public_id": response.get("public_id")
            })
            print("✅")
        except Exception as e:
            print(f"❌")
            print(f"   Error: {str(e)}\n")
            results["errors"].append({
                "file": filename,
                "error": str(e)
            })
    
    # Summary
    print(f"\n✨ Upload Summary:")
    print(f"   Resume: {'✅ 1' if results['resume'] else '❌ 0'}")
    print(f"   Certificates: ✅ {len(results['certificates'])} of {len(cert_files)}")
    if results["errors"]:
        print(f"   Errors: ❌ {len(results['errors'])}")
    print()
    
    # Generate environment variables
    print("📝 Generated Environment Variables:\n")
    print(f"VITE_RESUME_URL={results['resume']['url'] if results['resume'] else 'NOT_UPLOADED'}")
    print()
    
    for i, cert in enumerate(results["certificates"], 1):
        print(f"VITE_CERT_{i}={cert['url']}")
    
    if results["errors"]:
        print("\n⚠️  Errors encountered:")
        for err in results["errors"]:
            print(f"   - {err['file']}: {err['error']}")
    
    # Save results
    output_file = script_dir / "cloudinary-upload-results.json"
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\n💾 Results saved to: {output_file}")
    
    return results

if __name__ == "__main__":
    try:
        upload_files()
    except Exception as e:
        print(f"❌ Fatal error: {str(e)}")
        sys.exit(1)
