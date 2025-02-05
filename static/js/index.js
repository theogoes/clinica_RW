const b = document.getElementById("index_circle")
const p = document.getElementById("txt_index")


b.addEventListener("click",()=>{
    b.style.width = "100vw"
    b.style.height = "100vh"
    b.style.borderRadius = "0px"
    p.style.color = "#D3A6E2"
    
    setTimeout(()=> { 
        let check = localStorage.getItem("valor")
        check == null? window.location.assign("http://127.0.0.1:5000/cadastro"): window.location.assign("http://127.0.0.1:5000/simulacao") }
        ,600)
})