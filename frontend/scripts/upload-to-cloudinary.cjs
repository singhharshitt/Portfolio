#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

// Cloudinary configuration
const CLOUD_NAME = 'dtvqrkwvv';
const API_KEY = '755174683753774';
const API_SECRET = 'S9UTaz76VcO6I97pCnyiI3_jgQk';

// Paths
const certificatesDir = path.join(__dirname, '../src/Certificates');
const assetsDir = path.join(__dirname, '../src/assets');
const cvPath = path.join(assetsDir, 'CVV.pdf');

// Helper to upload file to Cloudinary using curl with signed authentication
async function uploadToCloudinary(filePath, publicId) {
  return new Promise((resolve, reject) => {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      
      // Create signature for authenticated upload
      // Parameters must be in alphabetical order for signature
      const params = {
        public_id: publicId,
        resource_type: 'raw',
        timestamp: timestamp,
      };
      
      // Sort parameters alphabetically and create string to sign
      const paramsArray = Object.keys(params)
        .sort()
        .map(key => `${key}=${params[key]}`);
      const stringToSign = paramsArray.join('&') + API_SECRET;
      
      const signature = crypto
        .createHash('sha1')
        .update(stringToSign)
        .digest('hex');
      
      const curlCommand = `curl -X POST https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload -F "file=@\\"${filePath}\\"" -F "public_id=${publicId}" -F "api_key=${API_KEY}" -F "timestamp=${timestamp}" -F "signature=${signature}" -F "resource_type=raw" -s`;
      
      const result = execSync(curlCommand, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
      const response = JSON.parse(result);
      
      if (response.secure_url) {
        resolve({
          publicId,
          url: response.secure_url,
          size: response.bytes,
          success: true,
        });
      } else {
        reject(new Error(`Upload failed for ${publicId}: ${response.error?.message || 'Unknown error'}`));
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Helper to generate clean public ID from filename
function generatePublicId(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '') // Remove extension
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Sleep helper
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main upload function
async function main() {
  console.log('🚀 Starting Cloudinary upload...\n');
  
  const results = {
    resume: null,
    certificates: [],
    errors: [],
  };
  
  // Upload resume
  if (fs.existsSync(cvPath)) {
    console.log('📄 Uploading resume (CVV.pdf)...');
    try {
      const publicId = `resume/harshit-singh-cv`;
      const result = await uploadToCloudinary(cvPath, publicId);
      results.resume = result;
      console.log(`✅ Resume uploaded successfully`);
      console.log(`   URL: ${result.url}\n`);
    } catch (error) {
      console.error(`❌ Resume upload failed: ${error.message}\n`);
      results.errors.push({ file: 'CVV.pdf', error: error.message });
    }
    await sleep(500);
  } else {
    console.error(`❌ Resume file not found: ${cvPath}\n`);
    results.errors.push({ file: 'CVV.pdf', error: 'File not found' });
  }
  
  // Upload certificates
  console.log('📜 Uploading certificates...\n');
  const certificateFiles = fs.readdirSync(certificatesDir)
    .filter(file => file.toLowerCase().endsWith('.pdf'))
    .sort();
  
  console.log(`Found ${certificateFiles.length} certificate files.\n`);
  
  for (let i = 0; i < certificateFiles.length; i++) {
    const file = certificateFiles[i];
    const filePath = path.join(certificatesDir, file);
    const publicId = `certificates/${generatePublicId(file)}`;
    
    try {
      console.log(`[${i + 1}/${certificateFiles.length}] Uploading ${file}...`);
      const result = await uploadToCloudinary(filePath, publicId);
      results.certificates.push({
        fileName: file,
        ...result,
      });
      console.log(`✅ Success\n`);
      await sleep(300); // Throttle uploads
    } catch (error) {
      console.error(`❌ Failed: ${error.message}\n`);
      results.errors.push({ file, error: error.message });
    }
  }
  
  console.log(`\n✨ Upload Summary:`);
  console.log(`   Resume: ${results.resume ? '✅ 1' : '❌ 0'}`);
  console.log(`   Certificates: ✅ ${results.certificates.length} of ${certificateFiles.length}`);
  if (results.errors.length > 0) {
    console.log(`   Errors: ❌ ${results.errors.length}`);
  }
  console.log();
  
  // Generate environment variables
  console.log('📝 Generated Environment Variables:\n');
  console.log(`VITE_RESUME_URL=${results.resume?.url || 'NOT_UPLOADED'}`);
  console.log();
  
  results.certificates.forEach((cert, index) => {
    const certNum = index + 1;
    console.log(`VITE_CERT_${certNum}=${cert.url}`);
  });
  
  if (results.errors.length > 0) {
    console.log('\n⚠️  Errors encountered:');
    results.errors.forEach(err => {
      console.log(`   - ${err.file}: ${err.error}`);
    });
  }
  
  // Save results to JSON
  const outputPath = path.join(__dirname, 'cloudinary-upload-results.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Results saved to: ${outputPath}`);
  
  return results;
}

// Run
main().catch(console.error);
