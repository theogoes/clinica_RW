 

const im = document.getElementById("input_im")
const qtd = document.getElementById("input_qtd")
const site = document.getElementById("input_site")
const local = document.getElementById("input_local")
const alor = document.getElementById("input_valor")
const b_cad = document.getElementById("Simular")
let itens = JSON.parse(localStorage.getItem('inf')) || [];



b_cad.addEventListener("click",()=>{
    const infos = {
        imobiliaria:document.getElementById("input_im").value,
        local: document.getElementById("input_local").value,
        valor: document.getElementById("input_valor").value,
        salas: document.getElementById("input_qtd").value,
        link: document.getElementById("input_site").value   
    }
    const json_s = JSON.stringify(infos)
    
    saveLocal(json_s)
    saveDB(json_s)
})

function saveLocal(info){
    const control = Number(localStorage.getItem("inf_control")|| 0) + 1
    localStorage.setItem("inf_control", control)
    localStorage.setItem(`inf_${control}`, info)
}
function saveDB(info){
    $.ajax({
        url:"/insertdata",
        type:"POST",
        contentType:"application/json",
        data: JSON.stringify(info)
    })
    console.log(info)
}