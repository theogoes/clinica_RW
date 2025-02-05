const im = document.getElementById("input_im")
const qtd = document.getElementById("input_qtd")
const site = document.getElementById("input_site")
const local = document.getElementById("input_local")
const alor = document.getElementById("input_valor")
const b_cad = document.getElementById("Simular")
let informacoes = JSON.parse(localStorage.getItem('infos')) || []


b_cad.addEventListener("click",()=>{
    
    let imobiliaria = im.value
    let salas = qtd.value
    let link =  site.value
    let loc = local.value
    let valor = alor.value
    const infos = {imobiliaria, salas, link, loc, valor}
    const json_s = JSON.stringify(infos)
    informacoes.push(json_s)
    saveLocal(informacoes)
})

function saveLocal(info){
    localStorage.setItem("infos",info)
}

function saveDB(info){
    
    console.log(json_s)
}