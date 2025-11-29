// CONECTANDO ELEMENTOS DO HTML
const calendar = document.getElementById("calendar")
const monthYear = document.getElementById("month-year")
const daysContainer = document.getElementById("days")
const prevMonth = document.getElementById("prev-month")
const nextMonth = document.getElementById("next-month")

// PARA RECEBER A DATA ATUAL
let currentDay = new Date()

function renderCalendar(date){
	const year = date.getFullYear() // RETORNA O ANO 
	const month = date.getMonth() // RETORNA O MÊS
	
	// VIZUALIZAÇÃO NO MÊS E ANO DO CALENDÁRIO
	const monthName = date.toLocaleString("pt-BR", {month: "long"})
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
	for(let i=0; i<firstDayMonth; i++){
		daysContainer.innerHTML += "<div></div>"
	}
	
    // LOOP PARA GERAR DIAS NUMERADOS NO CALENDÁRIO
	for(let i=1; i<=lastDayMonth; i++){
		const dayElement = document.createElement("div")
        dayElement.textContent = i

        // PARA MARCAR O DIA ATUAL
        if(year === today.getFullYear() && month === today.getMonth() && i === today.getDate()){
            dayElement.classList.add("active")
        }

		// INTERAÇÃO COM OS DIAS
		dayElement.addEventListener("click", () =>{

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


if (window.history && window.history.replaceState) {
        
        // 1. O PULO DO GATO:
        // Substituímos a entrada ATUAL do histórico pela URL da Home (/).
        // Isso faz com que a seta "Voltar" do navegador aponte diretamente para a Home.
        window.history.replaceState(null, null, "/");
        
        // 2. Adicionamos a URL ATUAL (/day?date=...) de volta à pilha, 
        // logo após a Home. Isso permite que a página atual seja referenciada se for necessário.
        window.history.pushState(null, null, window.location.href);

    }
