//Elementos DOOM a serem usados
const cadButtom= document.getElementById("cad_b")   //Botão de cadastro
const cadText = document.getElementById("cad_text") //Textos apresentados no processo de cadastro
const cadInput = document.getElementById("cad_i")   //Campo que o usuario preenche
const cadStep = document.getElementById("pg_txt")   //Paginação do processo de cadastro

//Textos a serem apresentados na tela do usuario
const cadFrontTexts = ["",
    "Para iniciarmos, poderia informar o nome da IMOBILIARIA do imovel",
    "Em qual bairro ele se localiza?", 
    "Quantas salas (consultórios) ele possui?", 
    "Valor qual o seu valor mensal?", 
    "Qual o link da imobiliaria para aluga-lo?",
    "Cadastro realizado com sucesso! \n Vamos para a simulação"    ]

//Campos a serem preenchidos para simulação da clinica (usados como chaves no objeto 'infos')
const fields = ["imobiliaria", "local","salas", "valor","link"]

//Texto a serem apresentados no input, auxiliando o usuario no seu preenchimento
const placeHolderTxt = [
    "",
    "Insira o bairro do imovel",
    "Insira a quantiedade de salas do imovel",
    "Insira o custo mensa (aluguel, pacela, etc..)",
    "Insira o link de acesso para alugar o imovel"
]

//Objeto a ser construido com as informações preenchidas
const infos = {}

//Etapa atual do usuario
let currentStep = 0

/*
  Função registrationHandler:
  - Gerencia o fluxo principal do cadastro.
  - Incrementa a etapa 
  - Incrementa a etapa e, dependendo do valor de 'currentStep', chama
    a função de validação ou a função de finalização do cadastro.
*/
function registrationHandler(){
    cadButtom.disabled = true // Desativa o botão para evitar múltiplos cliques
    currentStep++ // Avança para a próxima etapa

    
    currentStep < cadFrontTexts.length? // Se ainda há textos para serem mostrados:
    validationStep() // executa a validação
    : registrationStep() // caso contrário, finaliza o cadastro.

    cadButtom.disabled = false
    console.log(infos);
}

function validationStep(){
    if(currentStep === 1){
        setTimeout(()=>{toggleClass(cadInput,"off","on")},1000)
        textChangeAnimation(cadFrontTexts[currentStep])
        cadStep.textContent = `${(currentStep)+1}/${fields.length}`
        return
    }
    const inputValue = cadInput.value 
    const validationCod  = validation(inputValue, currentStep)

    if(validationCod !== 200){
        treatValidation(validationCod)
        currentStep--
        return
    }
    if(cadInput.classList.contains("invalid"))
        toggleClass(cadInput, "invalid", "valid")

    infos[fields[currentStep - 2]] = inputValue
    textChangeAnimation(cadFrontTexts[currentStep])
    cadStep.textContent = `${(currentStep)}/${fields.length}`
    if(currentStep === cadFrontTexts.length){
        toggleClass(cadInput,"on","disable")
        cadButtom.textContent = "Cadastrar"}
}

function registrationStep(){
    const json_s = JSON.stringify(infos)
    saveLocal(json_s)
    //saveDB(json_s)
    cadButtom.disabled = true
    cadButtom.classList.add("off")
    cadInput.classList.add("off")
    cadText.classList.remove("on")
    cadText.classList.add("off")
    setTimeout(()=>{
        window.location.replace("http://127.0.0.1:5000/simulacao")
        //window.location.assign("https://psybudget.up.railway.app/simulacao")
    },1000)
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

function validation(valor, id){
    if(!valor) return 301
    if((fields[currentStep - 2].includes("valor")|| fields[currentStep -2].includes("salas")) && !parseInt(valor)) return 300
    return 200
    
}

function treatValidation(cod){
    if(cod == 300)textChangeAnimation("Ultilize apenas números")
    else textChangeAnimation(`Informe um dado para salvarmos como ${fields[currentStep]}`)
    setTimeout(()=>{toggleClass(cadInput, "valid", "invalid")},1000)
}

function textChangeAnimation(text){
    toggleClass(cadText, "on", "off")
    toggleClass(cadInput, "on","off")
    toggleClass(cadButtom, "on","off")
    setTimeout(()=>{
        cadText.textContent = text
        cadInput.placeholder = placeHolderTxt[currentStep]
        toggleClass(cadText, "off", "on")
        toggleClass(cadInput, "off", "on")
        toggleClass(cadButtom, "off", "on")
        cadInput.value = ""
    },1000)
}

function toggleClass(input, classOff, clasOn){
    input.classList.remove(classOff)
    input.classList.add(clasOn)
}