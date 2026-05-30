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
    const amountInput = document.getElementById('text');
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
    'привет': { en: 'hello', de: 'hallo', fr: 'bonjour'},
    'здраствуйте': { en: 'hello', de: 'hallo', fr: 'bonjour'},
    'здраствуй': { en: 'hello', de: 'hallo', fr: 'bonjour'},
    'даров': { en: 'hello', de: 'hallo', fr: 'bonjour'},
    'здрасте': { en: 'hello', de: 'hallo', fr: 'bonjour'},
    'спасибо': { en: 'thanks', de: 'danke', fr: 'merci'},
    'извините': { en: 'excuse me', de: 'verzeihen sie', fr: 'excusez-moi'},
    'извиняюсь': { en: 'excuse me', de: 'verzeihen sie', fr: 'excusez-moi'},
    'помогите': { en: 'help', de: 'Hilfe', fr: 'aide'},
    'да': { en: 'yes', de: 'ja', fr: 'oui'},
    'нет': { en: 'no', de: 'nein', fr: 'non'},

    'где': { en: 'where is', de: 'wo ist', fr: 'où est'},
    'как': { en: 'how to', de: 'wie', fr: 'comment'},
    'и': { en: 'and', de: 'und', fr: 'et'},
    'тут': { en: 'here', de: 'hier', fr: 'ici'},
    'вы': { en: 'you', de: 'du', fr: 'toi'},
    'ты': { en: 'you', de: 'du', fr: 'toi'},
    'я': { en: 'I', de: 'ich', fr: 'je'},
    'к': { en: 'to the', de: 'zum', fr: 'au'},
    'на': { en: 'on the', de: 'auf', fr: 'sur le'},
    'до': { en: 'to the', de: 'zur', fr: 'aux'},
    'в': { en: 'to the', de: 'zur', fr: 'aux'},


    'ресторан': { en: 'restaurant', de: 'restaurant', fr: 'restaurant'},
    'ресторана': { en: 'restaurant', de: 'restaurant', fr: 'restaurant'},
    'ресторану': { en: 'restaurant', de: 'restaurant', fr: 'restaurant'},
    'кафе': { en: 'cafe', de: 'cafe', fr: 'café' },
    'туалет': { en: 'toilet', de: 'toilette', fr: 'toilettes'},
    'туалету': { en: 'toilet', de: 'toilette', fr: 'toilettes'},
    'уборная': { en: 'toilet', de: 'toilette', fr: 'toilettes'},
    'уборной': { en: 'toilet', de: 'toilette', fr: 'toilettes'},
    'туалета': { en: 'toilet', de: 'toilette', fr: 'toilettes'},
    'выход': { en: 'exit', de: 'ausfahrt', fr: 'sortie'},
    'выхода': { en: 'exit', de: 'ausfahrt', fr: 'sortie'},
    'выходу': { en: 'exit', de: 'ausfahrt', fr: 'sortie'},
    'вход': { en: 'entrance', de: 'eingang', fr: 'entrée'},
    'входа': { en: 'entrance', de: 'eingang', fr: 'entrée'},
    'входу': { en: 'entrance', de: 'eingang', fr: 'entrée'},
    'аэропорт': { en: 'airport', de: 'flughafen', fr: 'aéroport'},
    'аэропорту': { en: 'airport', de: 'flughafen', fr: 'aéroport'},
    'аэропорта': { en: 'airport', de: 'flughafen', fr: 'aéroport'},
    'вокзал': { en: 'train station', de: 'bahnhof', fr: 'gare'},
    'вокзалу': { en: 'train station', de: 'bahnhof', fr: 'gare'},
    'вокзала': { en: 'train station', de: 'bahnhof', fr: 'gare'},
    
    'как дела': { en: 'how are you', de: 'wie geht es dir', fr: 'comment vas-tu'},
    'как твои дела': { en: 'how are you', de: 'wie geht es dir', fr: 'comment vas-tu'},

    'добраться': { en: 'get to the', de: 'gelangen', fr: 'arriver là-bas'},
    'попасть': { en: 'get to the', de: 'gelangen', fr: 'arriver là-bas'},
    'пройти': { en: 'get to the', de: 'gelangen', fr: 'arriver là-bas'},
    'ближайший': { en: 'nearest', de: 'das nächstgelegene', fr: 'le plus proche'},
    'ближайшая': { en: 'nearest', de: 'das nächstgelegene', fr: 'le plus proche'},
    'поблизости': { en: 'nearby', de: 'in der Nähe', fr: 'à proximité'},
    'рядом': { en: 'nearby', de: 'in der Nähe', fr: 'à proximité'},
    'вблизи': { en: 'nearby', de: 'in der Nähe', fr: 'à proximité'},
    'неподалеку': { en: 'nearby', de: 'in der Nähe', fr: 'à proximité'},
}

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

function TranslatesLanguages() {
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



document.getElementById('text').addEventListener('input', convertCurrency);
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
