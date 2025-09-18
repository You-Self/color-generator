const palette = document.getElementById('palette');
const generateBtn = document.querySelector('.generate-btn');

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createColorCard(color) {
  const card = document.createElement('div');
  card.classList.add('color-card');

  const colorBox = document.createElement('div');
  colorBox.classList.add('color-box');
  colorBox.style.backgroundColor = color;

  const hexText = document.createElement('p');
  hexText.classList.add('hex');
  hexText.textContent = color;

  const actions = document.createElement('div');
  actions.classList.add('actions');

  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';
  copyBtn.onclick= () => {
    navigator.clipboard.writeText(color);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = 'Copy', 1000);
  };

  const lockBtn = document.createElement('button');
  lockBtn.classList.add('lock');
  const lockImg = document.createElement('img');
  lockImg.src = './images/unlocked.png';
  lockImg.alt = 'unlock';
  lockImg.style.width = '20px';
  lockImg.style.height = '20px';
  lockBtn.appendChild(lockImg);

  lockBtn.onclick = () => {
    card.classList.toggle('locked');
    lockBtn.classList.toggle('locked');
    if (card.classList.contains('locked')) {
      lockImg.src = './images/locked.png';
      lockImg.alt = 'lock';
    } else {
      lockImg.src = './images/unlocked.png';
      lockImg.alt = 'unlock';
    }
  };

  actions.appendChild(copyBtn);
  actions.appendChild(lockBtn);

  card.appendChild(colorBox);
  card.appendChild(hexText);
  card.appendChild(actions);

  return card;
}

function generatePalette() {
  const cards = palette.querySelectorAll('.color-card');
  if (cards.length === 0) {
    for (let i = 0; i < 5; i++) {
      const color = getRandomColor();
      palette.appendChild(createColorCard(color));
    }
  } else {
    cards.forEach(card => {
      if (!card.classList.contains('locked')) {
        const newColor = getRandomColor();
        card.querySelector('.color-box').style.backgroundColor = newColor;
        card.querySelector('.hex').textContent = newColor;
        card.querySelector('button').onclick = () => {
          navigator.clipboard.writeText(newColor);
          card.querySelector('button').textContent = 'Copied!';
          setTimeout(() => card.querySelector('button').textContent = 'Copy', 1000);
        }
      }
    });
  }
}

generatePalette();

generateBtn.addEventListener('click', generatePalette);