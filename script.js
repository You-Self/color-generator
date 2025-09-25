const palette = document.getElementById('palette');
const generateBtn = document.querySelector('.generate-btn');

function getRandomColor() {
  const hexDigits = '0123456789ABCDEF';
  let hexColor = '#';
  for (let i = 0; i < 6; i++) {
    hexColor += hexDigits[Math.floor(Math.random() * 16)];
  }
  return hexColor;
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
  lockImg.classList.add('lockImg');
  lockImg.src = './images/unlocked.png';
  lockImg.alt = 'unlock';
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

const customPalette = document.getElementById('custom-palette');
customPalette.innerHTML = '';

function createCustomCard(defaultColor = '#FF0000') {
  const customCard = document.createElement('div');
  customCard.classList.add('color-card');

  const customBox = document.createElement('div');
  customBox.classList.add('color-box');
  customBox.style.backgroundColor = defaultColor;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'custom-input';
  input.value = defaultColor;
  input.maxLength = 7;
  input.oninput = function () {
    let val = input.value.toUpperCase();
    if (!val.startsWith('#')) val = '#' + val;
    input.value = val.slice(0, 7);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      customBox.style.backgroundColor = val;
      hexText.textContent = val;
      customSelector.value = val;
    }
  };
  
  const customSelector = document.createElement('input');
  customSelector.type = 'color';
  customSelector.className = 'color-selector';
  customSelector.value = defaultColor;
  customSelector.oninput = function () {
    const val = customSelector.value.toUpperCase();
    customBox.style.backgroundColor = val;
    hexText.textContent = val;
    input.value = val;
  };
  const hexText = document.createElement('p');
  hexText.className = 'hex';
  hexText.textContent = defaultColor;
  
  
  customCard.appendChild(customBox);
  customCard.appendChild(input);
  customCard.appendChild(customSelector);
  customCard.appendChild(hexText);
  
  return customCard;
}

customPalette.appendChild(createCustomCard('#FF0000'));
customPalette.appendChild(createCustomCard('#0000FF'));

document.getElementById("modeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});