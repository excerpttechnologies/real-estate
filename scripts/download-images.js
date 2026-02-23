const https = require('https');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

// Ensure directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Real estate themed images from Unsplash (direct download URLs)
const images = [
    {
        name: 'hero-bg.jpg',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop&q=80',
        desc: 'Modern skyscraper buildings - hero background'
    },
    {
        name: 'property-1.jpg',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80',
        desc: 'Luxury apartment interior'
    },
    {
        name: 'property-2.jpg',
        url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&q=80',
        desc: 'Premium villa with pool'
    },
    {
        name: 'property-3.jpg',
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
        desc: 'Modern office space'
    },
    {
        name: 'property-4.jpg',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
        desc: 'Furnished apartment'
    },
    {
        name: 'property-5.jpg',
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
        desc: 'Luxury penthouse'
    },
    {
        name: 'property-6.jpg',
        url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80',
        desc: 'Modern apartment building'
    },
    {
        name: 'property-7.jpg',
        url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop&q=80',
        desc: 'Elegant home interior'
    },
    {
        name: 'property-8.jpg',
        url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80',
        desc: 'Premium villa exterior'
    },
    {
        name: 'city-mumbai.jpg',
        url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=800&fit=crop&q=80',
        desc: 'Mumbai skyline'
    },
    {
        name: 'city-delhi.jpg',
        url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&h=800&fit=crop&q=80',
        desc: 'Delhi landmarks'
    },
    {
        name: 'city-bangalore.jpg',
        url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=800&fit=crop&q=80',
        desc: 'Bangalore cityscape'
    },
    {
        name: 'city-hyderabad.jpg',
        url: 'https://images.unsplash.com/photo-1572883454114-efb3f30a9e90?w=600&h=800&fit=crop&q=80',
        desc: 'Hyderabad Charminar'
    },
    {
        name: 'city-pune.jpg',
        url: 'https://images.unsplash.com/photo-1625046635769-24f86efc4e87?w=600&h=800&fit=crop&q=80',
        desc: 'Pune city view'
    },
    {
        name: 'city-chennai.jpg',
        url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=800&fit=crop&q=80',
        desc: 'Chennai Marina Beach'
    },
    {
        name: 'new-project-1.jpg',
        url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&q=80',
        desc: 'New construction project'
    },
    {
        name: 'new-project-2.jpg',
        url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=600&fit=crop&q=80',
        desc: 'Under construction building'
    },
    {
        name: 'new-project-3.jpg',
        url: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80',
        desc: 'Modern tower under development'
    }
];

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);

        function makeRequest(requestUrl, redirectCount = 0) {
            if (redirectCount > 5) {
                reject(new Error('Too many redirects'));
                return;
            }

            https.get(requestUrl, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    makeRequest(response.headers.location, redirectCount + 1);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`HTTP ${response.statusCode}`));
                    return;
                }

                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            }).on('error', (err) => {
                fs.unlink(filepath, () => { });
                reject(err);
            });
        }

        makeRequest(url);
    });
}

async function downloadAll() {
    console.log('Downloading real estate images...\n');

    for (const img of images) {
        const filepath = path.join(imagesDir, img.name);

        // Skip if already downloaded
        if (fs.existsSync(filepath)) {
            const stats = fs.statSync(filepath);
            if (stats.size > 1000) {
                console.log(`✓ ${img.name} (already exists - ${(stats.size / 1024).toFixed(0)}KB)`);
                continue;
            }
        }

        try {
            process.stdout.write(`  Downloading ${img.name}...`);
            await downloadImage(img.url, filepath);
            const stats = fs.statSync(filepath);
            console.log(` ✓ (${(stats.size / 1024).toFixed(0)}KB)`);
        } catch (err) {
            console.log(` ✗ Error: ${err.message}`);
        }
    }

    console.log('\nDone! All images downloaded to public/images/');
}

downloadAll();
