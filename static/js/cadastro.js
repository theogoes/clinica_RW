const b= document.getElementById("cad_b")
const txt = document.getElementById("cad_text")
const i = document.getElementById("cad_i")


const txts = [
    "",
    "local",
    "salas",
    "valor",
    "link",
]
const campos = ["imobiliaria", "local","salas", "valor","link"]
const infos = {}
let count = 0
function teste(){
    b.disabled = true
    count++
    if (count < campos.length) {
        const codValido = validacao(i.value, count)
        if(codValido == 200){
            if(i.classList.contains("invalid")){
                i.classList.remove("invalid")
                i.classList.add("valid")
            }
            infos[campos[count - 1]] = i.value 
            tratarTXT(txts[count])
        }else{ 
            tratarValidacao(codValido)
            count--
        }
        i.value = ""
        if(count == 4){
            b.textContent = "Cadastrar"}
    }else{
        const json_s = JSON.stringify(infos)
        saveLocal(json_s)
        //saveDB(json_s)
        b.disabled = true
        b.classList.add("off")
        i.classList.add("off")
        txt.classList.remove("on")
        txt.classList.add("off")
        setTimeout(()=>{
            //window.location.replace("http://127.0.0.1:5000/simulacao")
            window.location.assign("https://psybudget.up.railway.app/simulacao")
        })
    }      
    console.log(infos);
}
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
function validacao(valor, id){
    console.log(valor +", "+id)
    if(valor){
        if(id == 3 || id == 4){
            if(parseInt(valor)) return 200
            else return 300
        }else return 200
    }else return 301
}
function tratarValidacao(cod){
    i.classList.remove("valid")
    i.classList.add("invalid")
    if(cod == 300)tratarTXT("Ultilize apenas números")
    else tratarTXT("Informe um valor")
}
function tratarTXT(text){
    txt.classList.remove("on")
    txt.classList.add("off")
    setTimeout(()=>{
        txt.textContent = text
        txt.classList.remove("off")
        txt.classList.add("on")
        b.disabled = false
    },1000)
}