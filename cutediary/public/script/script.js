// =======================
// GERANDO O CALENDÁRIO
// =======================

// CONECTANDO ELEMENTOS DO HTML
const calendar = document.getElementById("calendar")
const monthYear = document.getElementById("monthYear")
const daysContainer = document.getElementById("days")
const prevMonth = document.getElementById("prevMonth")
const nextMonth = document.getElementById("nextMonth")

// PARA RECEBER A DATA ATUAL
let currentDay = new Date()

function renderCalendar(date) {
    const year = date.getFullYear() // RETORNA O ANO 
    const month = date.getMonth() // RETORNA O MÊS

    // VIZUALIZAÇÃO NO MÊS E ANO DO CALENDÁRIO
    const monthName = date.toLocaleString("pt-BR", { month: "long" })
    let monthCap = monthName.charAt(0).toUpperCase() + monthName.slice(1)

    monthYear.textContent = `${monthCap} de ${year}`

    // INSTANCIAÇÃO DO OBEJTO QUE REBE A DATA QUE SERÁ COMPARADA NA LÓGICA DESTA FUNÇÃO
    const today = new Date()

    // RETORNA O DIA DA SEMANA CORRESPONTE AO 1° DIA DO MÊS
    const firstDayMonth = new Date(year, month, 1).getDay()

    // RETORNA O ÚLTIMO DIA DO MÊS ATUAL
    const lastDayMonth = new Date(year, month + 1, 0).getDate()

    daysContainer.innerHTML = ""

    // LOOP PARA GERAR ESPAÇOS VAZIOS NO CALENDÁRIO
    for (let i = 0; i < firstDayMonth; i++) {
        daysContainer.innerHTML += "<div></div>"
    }

    // LOOP PARA GERAR DIAS NUMERADOS NO CALENDÁRIO
    for (let i = 1; i <= lastDayMonth; i++) {
        const dayElement = document.createElement("div")
        dayElement.textContent = i

        // PARA MARCAR O DIA ATUAL
        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add("active")
        }

        // INTERAÇÃO COM OS DIAS
        dayElement.addEventListener("click", () => {

            // FORMATAÇÃO DA DATA PARA COMPATIBILIDADE COM O SQL
            const day = i.toString().padStart(2, "0")
            const monthFormatted = (month + 1).toString().padStart(2, "0")

            const finalDate = `${year}-${monthFormatted}-${day}`

            window.location.href = `/day?date=${finalDate}`
        })

        // PARA INSERIR OS ELEMENTOS
        daysContainer.appendChild(dayElement)
    }
}

// PARA NAVEGAÇÃO NO CALENDÁRIO
prevMonth.addEventListener("click", () => {
    currentDay.setMonth(currentDay.getMonth() - 1)
    renderCalendar(currentDay)
})

nextMonth.addEventListener("click", () => {
    currentDay.setMonth(currentDay.getMonth() + 1)
    renderCalendar(currentDay)
})

// PARA RODAR FUNÇÃO
renderCalendar(currentDay)

// ============================================
// CONFIGURAÇÃO DA API DAS FRASES MOTIVACIONAIS
// ============================================

// CONECTANDO ELEMENTOS DO HTML
const emotionButtons = document.querySelectorAll(".emojiEmotion")
const motivationTextElement = document.getElementById("menssage")

function getRandomPhrase(emotion) {
    const phrases = motivationalPhrases[emotion];
    if (phrases && phrases.length > 0) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        return phrases[randomIndex];
    }
    return "Que bom que você está aqui. Conte com a gente.";
}

async function loadPhrases() {
    try {
        const response = await fetch("/json/phrasesMotivation.json");

        motivationalPhrases = await response.json();
        console.log("Frases motivacionais carregadas com sucesso!");

        setupEventListeners();

    } catch (error) {
        console.error("Erro ao carregar frases motivacionais:", error);
        motivationTextElement.textContent = "Erro ao carregar dados. Mas lembre-se: você é incrível!";
    }
}

function setupEventListeners() {
    emotionButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const clickedButton = event.currentTarget;
            const emotionTitleElement = clickedButton.querySelector("h3");
            const emotionName = emotionTitleElement.textContent.trim().toUpperCase(); // PEGA A EMOÇÃO SELECIONADA

            let phrase = getRandomPhrase(emotionName); // RECEBENDO FRASE ALEATÓRIA

            motivationTextElement.textContent = phrase;  // ENVIANDO FRASE PARA O HTML
        });
    });
}

// PARA RODAR FUNÇÃO
loadPhrases();

// ===================================
// PARA CONTAR OS CACTERES DOS TÍTULOS
// ===================================

document.addEventListener("DOMContentLoaded", () => {

    const titleInput = document.getElementById("title");
    const counter = document.getElementById("charCountInside");
    const max = 40;

    // Só ativa esse trecho se os elementos existirem na página
    if (titleInput && counter) {

        function updateCounter() {
            const length = titleInput.value.length;
            counter.textContent = `${length} / ${max}`;

            if (length >= max) {
                counter.classList.add("charCountLimit");
            } else {
                counter.classList.remove("charCountLimit");
            }
        }

        titleInput.addEventListener("input", updateCounter);
        updateCounter();
    }
});