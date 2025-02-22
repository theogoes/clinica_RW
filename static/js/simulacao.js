
document.body.onload = buildFront


function buildFront(){
    buildSimulations()
    }

function buildSimulations(){
    const dinaCar = document.getElementById("simulacao_carroceul")
    let simulacoens = [{}]
    let control = localStorage.getItem("inf_control")
    let step = 1
    while (step < control) {
        simulacoens.push(localStorage.getItem(`inf_${step}`))
        step++
    }

    simulacoens.forEach(( simulations, index) =>{

        const dinaDiv = document.createElement("div")
        dinaDiv.id = `sim_${index}`
        dinaDiv.className = "item_carroceul"
        dinaCar.appendChild(dinaDiv)

    } )
}


document.addEventListener("click",function(event){
    const divsCards = document.querySelectorAll(".item_carroceul")
    let divFocus = event.target.id.split("_")[1]
    if(!isNaN(divFocus)){
        divFocus < currentIndex? previousSimulation(divsCards) :nextSimulation(divsCards)
    }
})