const AdmZip = require('adm-zip');
const path = require('path');
const fs = require('fs');

// Fungsi untuk ekstrak file zip
function extractZip(zipFilePath, outputDir) {
    try {
        const zip = new AdmZip(zipFilePath);

        // Ekstrak semua file
        zip.getEntries().forEach((entry) => {
            const entryPath = path.join(outputDir, entry.entryName);

            // Jika file, tulis langsung ke direktori
            if (!entry.isDirectory) {
                const directory = path.dirname(entryPath);

                // Buat direktori jika belum ada
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }

                // Tulis file ke direktori
                fs.writeFileSync(entryPath, entry.getData());
                console.log(`Extracted: ${entryPath}`);
            }
        });

        console.log('Extraction complete!');
    } catch (error) {
        console.error('Error extracting ZIP file:', error);
    }
}

// Path file ZIP dan output direktori (direktori saat ini)
const zipFilePath = path.join(__dirname, 'p.zip'); // Ganti dengan nama file ZIP
const outputDir = __dirname; // Ekstrak ke direktori saat ini

extractZip(zipFilePath, outputDir);
