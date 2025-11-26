// CONECTANDO ELEMENTOS DO HTML
const calendar = document.getElementById("calendar")
const monthYear = document.getElementById("month-year")
const daysContainer = document.getElementById("days")
const prevMonth = document.getElementById("prev-month")
const nextMonth = document.getElementById("next-month")

// INSTANCIAÇÃO DO OBJETO QUE IRÁ ARMAZENAR A DATA QUE 
// O USUÁRIO ESTÁ VIZUALIZANDO ATUALMENTE NO CALENDÁRIO
let currentDate = new Date()

// FUNÇÃO QUE VAI GERAR O CALENDÁRIO 
function renderCalendar(date){

    const year = date.getFullYear() // ARMAZENA O ANO DA DATA FORNECIDA
    const month = date.getMonth() // ARMAZENA O MÊS DA DATA FORNECIDA
    const monthName = date.toLocaleString("pt-BR", { month: "long"}); // ARMAZENA O NOME DO MÊS 
    let monthCap = monthName.charAt(0).toUpperCase() + monthName.slice(1) // FORMATA O NOME DO MÊS PARA EXIBIÇÃO

    // ATUALIAÇÃO DO MÊS E ANO NO TOPO DO CALENDÁRIO 
    monthYear.textContent = `${monthCap} de ${year}`

    // INSTANCIAÇÃO DO OBJETO QUE IRÁ ARMAZENAR A DATA ATUAL REAL
    // PARA COMPARAÇÃO NA LÓGICA DESTA FUNÇÃO
    const today = new Date()

    // RETORNA O DIA DA SEMANA EM QUE O 1° DIA DO MÊS COMEÇA
    const firstDayMonth = new Date(year, month, 1).getDay()

    // RETORNA O ÚLTIMO DIA DO PRÓXIMO MÊS
    const lastDateMonth = new Date(year, month + 1, 0).getDate();

    daysContainer.innerHTML = ""

    // GERA OS ESPAÇOS VAZIOS
    for(let i=0; i<=firstDayMonth; i++){
        daysContainer.innerHTML += "<div></div>"
    }

    // GERA OS DIAS NUMERADOS DO MÊS
    for(let i=1; i<=lastDateMonth; i++){
        const dayElement = document.createElement("div")
        dayElement.textContent = i;

        if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
            dayElement.classList.add("active"); 
        }

        daysContainer.appendChild(dayElement);
    }

}

 prevMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendar(currentDate)
    })

    nextMonth.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendar(currentDate)
    })


renderCalendar(currentDate)

// PARA FIXAÇÃO DE LÓGICA

// currentDay = new Date()

// function gerarCalendario(data){

//     const ano = data.getFullYear()
//     const mes = data.getMonth()

//     const hoje = new Date()

//     const primeiroDiaDoMes = new Date(ano, mes, 1).getDay

//     const ultimoDiaDoMes = new Date(ano, mes + 1, 0)
// }
