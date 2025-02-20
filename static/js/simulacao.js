
document.body.onload = buildFront
var index = 0
const moveAmout = window.screen.width

function buildFront(){
    buildSimulations()
   nextSimulation(moveAmout/2) 
   dinaFocus(index)
    
}

function buildSimulations(){
    const dinaCar = document.getElementById("simulacao_container")
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
        dinaDiv.className = "simulacao_content f notOnFocus"
        dinaCar.appendChild(dinaDiv)

    } )
}

function dinaFocus(index){
    const focusDiv = document.getElementById(`sim_${index}`)
    if(document.getElementById(`sim_${index - 1}`)){
        document.getElementById(`sim_${index - 1}`).classList.contains("notOnFocus")?
        document.getElementById(`sim_${index+1}`).classList.add("notOnFocus"):
        document.getElementById(`sim_${index-1}`).classList.add("notOnFocus")
    }else{
        document.getElementById(`sim_${index+1}`).classList.add("notOnFocus")
    }
    focusDiv.classList.remove("notOnFocus")
}

function moveItens(amount){
    const divsCards = document.querySelectorAll(".simulacao_content")
    divsCards.forEach(div =>{
        console.log(index+"/"+amount)
        div.style.transform = `translateX(${amount}px)`
    })
}

function nextSimulation(move){
    index++
    dinaFocus(index)
    moveItens(-move * index)
    
}
function previousSimulation(move){
    index--
    dinaFocus(index)
    index === 0 ? moveItens(move/4):moveItens(-move/index)

}



document.addEventListener("click",function(event){
    
    let divFocus = event.target.id.split("_")[1]
    if(!isNaN(divFocus)){
        const movement = moveAmout/1.8
        divFocus < index? previousSimulation(movement) :nextSimulation(movement)
    }
})