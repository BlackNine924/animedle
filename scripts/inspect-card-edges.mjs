import sharp from 'sharp';

async function inspectEdges() {
  const oldCard = 'public/cards/dragon-ball.png';
  const newCard = 'public/cards/bungo-stray-dogs.png';
  const oldRaw = await sharp(oldCard).raw().toBuffer({ resolveWithObject: true });
  const newRaw = await sharp(newCard).raw().toBuffer({ resolveWithObject: true });

  console.log('Old card corner (0,0):',
    oldRaw.data[0], oldRaw.data[1], oldRaw.data[2], oldRaw.data[3]);
  console.log('New card corner (0,0):',
    newRaw.data[0], newRaw.data[1], newRaw.data[2]);

  console.log('--- Horizontal slice at y=768 ---');
  for (let x = 0; x < 150; x += 10) {
    const idxOld = (768 * 1024 + x) * 4;
    const idxNew = (768 * 1024 + x) * 3;
    console.log(`x=${x}: Old=[${oldRaw.data[idxOld]},${oldRaw.data[idxOld+1]},${oldRaw.data[idxOld+2]},${oldRaw.data[idxOld+3]}] | New=[${newRaw.data[idxNew]},${newRaw.data[idxNew+1]},${newRaw.data[idxNew+2]}]`);
  }
}
inspectEdges();
