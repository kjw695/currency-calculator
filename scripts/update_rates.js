const fs = require('fs');
const path = require('path');

// ★ 여기에 사용하시는 API 주소 넣으세요
const API_URL = 'https://api.exchangerate-api.com/v4/latest/KRW'; 

// [수정] www 폴더 안의 assets를 바라보도록 설정
const ASSETS_PATH = path.join(__dirname, '../www/assets/rates.json');

async function update() {
    try {
        console.log('Fetching new rates...');
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('API request failed');
        
        const data = await response.json();
        
        const fileContent = {
            last_update: Date.now(),
            rates: data.rates
        };

        // 폴더가 없으면 에러 나니까 안전장치 추가
        const dir = path.dirname(ASSETS_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(ASSETS_PATH, JSON.stringify(fileContent, null, 2));
        console.log('✅ Success! Updated www/assets/rates.json');

    } catch (error) {
        console.error('❌ Error updating rates:', error);
        process.exit(1);
    }
}

update();