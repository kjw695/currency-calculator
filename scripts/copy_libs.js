// 파일 경로: scripts/copy_libs.js
const fs = require('fs');
const path = require('path');

// 복사할 원본 위치와 대상 위치 정의
const libs = [
    {
        src: 'node_modules/@fortawesome/fontawesome-free/css',
        dest: 'www/assets/libs/fontawesome/css'
    },
    {
        src: 'node_modules/@fortawesome/fontawesome-free/webfonts',
        dest: 'www/assets/libs/fontawesome/webfonts'
    },
    {
        src: 'node_modules/flag-icons/css',
        dest: 'www/assets/libs/flag-icons/css'
    },
    {
        src: 'node_modules/flag-icons/flags',
        dest: 'www/assets/libs/flag-icons/flags'
    },
    {
        src: 'node_modules/sortablejs/Sortable.min.js',
        dest: 'www/assets/libs/sortable/Sortable.min.js'
    }
];

// 복사 함수
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    if (!exists) return;

    const stats = fs.statSync(src);
    
    // 폴더면 재귀적으로 복사
    if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        // 파일이면 그냥 복사
        if (!fs.existsSync(path.dirname(dest))) fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
    }
}

console.log('📦 라이브러리 파일을 www/assets/libs 폴더로 복사합니다...');
libs.forEach(lib => {
    const source = path.join(__dirname, '../', lib.src);
    const destination = path.join(__dirname, '../', lib.dest);
    copyRecursiveSync(source, destination);
});
console.log('✅ 복사 완료! 이제 오프라인에서도 아이콘이 잘 보입니다.');