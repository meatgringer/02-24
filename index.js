function formatNumber(num, decimals = 3) {
    return num.toFixed(decimals).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function formatNUM(num, decimals = 0) {
    return num.toFixed(decimals).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}


function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetTab = document.getElementById(`tab-${tabName}`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    recalculateCurrentTab(tabName);
}

function recalculateCurrentTab(tabName) {
    switch(tabName) {
        case 'currency':
            convertCurrency();
            break;
        case 'translator':
            translateText();
            break;
        case 'temperature':
            convertTemperature();
            break;
        case 'tips':
            calculateTips();
            break;
    }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        switchTab(tabName);
    });
});


const exchangeRates = {
    RUB: 1,
    USD: 0.013,
    EUR: 0.011,
    BYN: 0.037,
    KZT: 6.237,
    CNY: 0.091,
    THB: 0.433
};

const currencySymbols = {
    RUB: '₽',
    USD: '$',
    EUR: '€',
    BYN: 'Б',
    KZT: '₸',
    CNY: '¥',
    THB: '฿'
};

function formatCurrency(amount, currency) {
    const symbol = currencySymbols[currency] || '';
    return `${symbol} ${formatNumber(amount)}`;
}

function convertCurrency() {
    const amountInput = document.getElementById('currency-amount');
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const resultDiv = document.getElementById('currency-result');
    
    const amount = parseFloat(amountInput.value) || 0;
    
    const amountInRUB = amount / exchangeRates[fromCurrency];
    const result = amountInRUB * exchangeRates[toCurrency];
    
    const formattedFrom = formatCurrency(amount, fromCurrency);
    const formattedTo = formatCurrency(result, toCurrency);
    
    resultDiv.textContent = `${formattedFrom} ≈ ${formattedTo}`;
}

function swapCurrencies() {
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    convertCurrency();
}


const languageNames = {
    ru: 'Русский',
    en: 'Английский',
    de: 'Немецкий',
    fr: 'Французский',
    zh: 'Китайский',
    th: 'Тайский'
};

const quickPhrases = {
    'привет': { en: 'hello', de: 'hallo', fr: 'bonjour', zh: '你好', th: 'สวัสดี' },
    'спасибо': { en: 'thank you', de: 'danke', fr: 'merci', zh: '谢谢', th: 'ขอบคุณ' },
    'где': { en: 'where is', de: 'wo ist', fr: 'où est', zh: '在哪里', th: 'ที่ไหน' },
    'туалет': { en: 'toilet', de: 'Toilette', fr: 'toilettes', zh: '厕所', th: 'ห้องน้ำ' },
    'сколько стоит': { en: 'how much', de: 'wie viel', fr: 'combien', zh: '多少钱', th: 'เท่าไหร่' },
    'извините': { en: 'pardon me', de: 'verzeihen sie', fr: 'excusez-moi', zh: '对不起', th: 'ประทานโทษ' },
    'помогите': { en: 'help', de: 'Hilfe', fr: 'aide', zh: '帮助', th: 'ช่วยด้วย' },
    'да': { en: 'yes', de: 'ja', fr: 'oui', zh: '是的', th: 'ใช่' },
    'нет': { en: 'no', de: 'nein', fr: 'non', zh: '不', th: 'ไม่' },
};

function translateText() {
    const text = document.getElementById('translate-text').value.toLowerCase().trim();
    const fromLang = document.getElementById('translate-from').value;
    const toLang = document.getElementById('translate-to').value;
    const resultDiv = document.getElementById('translate-result');
    
    if (!text) {
        resultDiv.textContent = 'Введите текст для перевода';
        return;
    }
    
    if (fromLang === toLang) {
        resultDiv.textContent = document.getElementById('translate-text').value;
        return;
    }
    
    let translated = text;
    
    if (fromLang === 'ru' && quickPhrases[text]) {
        translated = quickPhrases[text][toLang] || text;
    } else if (toLang === 'ru') {
        for (const [ruWord, translations] of Object.entries(quickPhrases)) {
            if (translations[fromLang] === text) {
                translated = ruWord;
                break;
            }
        }
    }
    
    if (translated === text && fromLang === 'ru' && text.includes(' ')) {
        const words = text.split(' ');
        translated = words.map(word => {
            const cleanWord = word.replace(/[?,!]/g, '');
            if (quickPhrases[cleanWord]) {
                return quickPhrases[cleanWord][toLang] || word;
            }
            return word;
        }).join(' ');
    }
    
    resultDiv.innerHTML = translated;
}

function swapTranslateLanguages() {
    const fromSelect = document.getElementById('translate-from');
    const toSelect = document.getElementById('translate-to');
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    translateText();
}


function convertTemperature() {
    const tempInput = document.getElementById('temp-value');
    const fromScale = document.getElementById('temp-from').value;
    const toScale = document.getElementById('temp-to').value;
    const resultDiv = document.getElementById('temp-result');
    
    const temp = parseFloat(tempInput.value) || 0;
    let result;
    
    if (fromScale === toScale) {
        result = temp;
    } else if (fromScale === 'C' && toScale === 'F') {
        result = (temp * 9/5) + 32;
    } else {
        result = (temp - 32) * 5/9;
    }
    
    const fromSymbol = fromScale === 'C' ? '°C' : '°F';
    const toSymbol = toScale === 'C' ? '°C' : '°F';
    
    resultDiv.textContent = `${temp}${fromSymbol} = ${result.toFixed(1)}${toSymbol}`;
}

function swapTemperature() {
    const fromSelect = document.getElementById('temp-from');
    const toSelect = document.getElementById('temp-to');
    [fromSelect.value, toSelect.value] = [toSelect.value, fromSelect.value];
    convertTemperature();
}


function calculateTips() {
    const billInput = document.getElementById('bill-amount');
    const tipPercent = document.getElementById('tip-percent').value;
    const peopleCount = document.getElementById('people-count').value;
    const resultDiv = document.getElementById('tips-result');
    
    const bill = parseFloat(billInput.value) || 0;
    const people = parseInt(peopleCount) || 1;
    const percent = parseFloat(tipPercent);
    
    const discountAmount = bill * (percent / 100);
    const totalBill = bill - discountAmount; 
    const perPerson = totalBill / people;
    
    resultDiv.innerHTML = `
        <span>Скидка (${percent}%): ${formatNUM(discountAmount)} руб</span>
        <span>Итого к оплате: ${formatNUM(totalBill)} руб</span>
        <span>На каждого (${people} чел.): ${formatNUM(perPerson)} руб</span>
    `;
}



document.getElementById('currency-amount').addEventListener('input', convertCurrency);
document.getElementById('from-currency').addEventListener('change', convertCurrency);
document.getElementById('to-currency').addEventListener('change', convertCurrency);
document.getElementById('swap-currencies').addEventListener('click', swapCurrencies);

document.getElementById('translate-text').addEventListener('input', translateText);
document.getElementById('translate-from').addEventListener('change', translateText);
document.getElementById('translate-to').addEventListener('change', translateText);

document.getElementById('temp-value').addEventListener('input', convertTemperature);
document.getElementById('temp-from').addEventListener('change', convertTemperature);
document.getElementById('temp-to').addEventListener('change', convertTemperature);
document.getElementById('swap-temp').addEventListener('click', swapTemperature);

document.getElementById('bill-amount').addEventListener('input', calculateTips);
document.getElementById('tip-percent').addEventListener('change', calculateTips);
document.getElementById('people-count').addEventListener('input', calculateTips);


convertCurrency();
translateText();
convertTemperature();
calculateTips();