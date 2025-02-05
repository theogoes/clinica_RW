const b = document.getElementById("index_circle")
const p = document.getElementById("txt_index")


b.addEventListener("click",()=>{
    b.style.width = "100vw"
    b.style.height = "100vh"
    b.style.borderRadius = "0px"
    p.style.color = "#D3A6E2"
    
    setTimeout(()=> { 
        let check = localStorage.getItem("valor")
        check == null? window.location.assign("https://psybudget.up.railway.app/cadastro"): window.location.assign("https://psybudget.up.railway.app/simulacao") }
        ,600)
})