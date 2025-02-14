const b= document.getElementById("cad_b")
const txt = document.getElementById("cad_text")
const i = document.getElementById("cad_i")
const pg = document.getElementById("pg_txt")


const txts = ["", "local", "salas", "valor", "link"]
const campos = ["imobiliaria", "local","salas", "valor","link"]
const placeHolderTxt = [
    "",
    "Insira o bairro do imovel",
    "Insira a quantiedade de salas do imovel",
    "Insira o custo mensa (aluguel, pacela, etc..)",
    "Insira o link de acesso para alugar o imovel"
]
const infos = {}
let count = 0

function teste(){
    b.disabled = true
    count++
    if (count < campos.length) {
        const codValido = validacao(i.value, count)
        if(codValido === 200){
            if(i.classList.contains("invalid")){
                toggleClass(i, "invalid", "valid")
            }
            infos[campos[count - 1]] = i.value 
            tratarTXT(txts[count])
        }else{ 
            tratarValidacao(codValido)
            count--
        }
        pg.textContent = `${(count)+1}/${campos.length}`
        if(count === campos.length - 1){
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
            window.location.replace("http://127.0.0.1:5000/simulacao")
            //window.location.assign("https://psybudget.up.railway.app/simulacao")
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
    if(!valor) return 301
    if((id === 3 || id === 4) && !parseInt(valor)) return 300
    return 200
    
}

function tratarValidacao(cod){
    toggleClass(i, "valid", "invalid")
    if(cod == 300)tratarTXT("Ultilize apenas números")
    else tratarTXT("Informe um valor")
}

function tratarTXT(text){
    toggleClass(txt, "on", "off")
    toggleClass(i, "on","off")
    toggleClass(b, "on","off")
    setTimeout(()=>{
        txt.textContent = text
        i.placeholder = placeHolderTxt[count]
        toggleClass(txt, "off", "on")
        toggleClass(i, "off", "on")
        toggleClass(b, "off", "on")
        b.disabled = false
        i.value = ""
    },1000)
}

function toggleClass(input, classOff, clasOn){
    input.classList.remove(classOff)
    input.classList.add(clasOn)
}