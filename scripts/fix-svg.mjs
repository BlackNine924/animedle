import fs from 'fs';

const filePath = 'src/components/FranchiseEmblem.tsx';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace(/\s+title="[^"]*"/g, '');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed SVG titles in FranchiseEmblem.tsx');
