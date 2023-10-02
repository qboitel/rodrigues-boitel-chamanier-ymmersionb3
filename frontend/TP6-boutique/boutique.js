const Qtn = document.querySelectorAll('.article-quantité>p:nth-child(2)')
const add = document.querySelectorAll('.add')
const del = document.querySelectorAll('.del')
const addPanier = document.querySelectorAll('.article-ajouter')

function changeQnt(nbr,e){
    //Permet de recupere l'index pour incrementer ou decrementer le compteur de l'article
    var indice
   if  (parseInt(nbr) > 0){
       indice = Array.from(new Set([...add])).indexOf(e.target)
   }else{
        indice = Array.from(new Set([...del])).indexOf(e.target)
   }

   // incremente ou decremente le compteur avec un gestion pour eviter les entier négatives
    let quantite = parseInt(Qtn[indice].innerText) + parseInt(nbr)
    console.log("valeur de quantité : ",quantite)
    if (quantite >= 0){
        Qtn[indice].innerText = quantite
    }else{
        Qtn[indice].innerText = 0
    }
}

// evenement quand le boutton '+' cliquer => ajouter un à la quantité
add.forEach((element) => {
    element.addEventListener('click',function(event){changeQnt(parseInt(1),event)})
})
// evenement quand le boutton '-' cliquer => enlever un à la quantité
del.forEach((element) => {
    element.addEventListener('click',function(event){changeQnt(parseInt(-1),event)})
})


let Panier = (JSON.parse(localStorage.getItem("panier"))) || []
let nbrPanier = document.querySelector('.nbr-article')

// liste des articles disponibles sur la boutique 
const allArticle = [
    {id: 0, nom: 'Air Jordan 1 Retro High University Blue', prix: 545, reduc: 0, photo: './article_1_front.jpg'},
    {id: 1, nom: 'Air Force 1 Low White Supreme', prix: 250, reduc: 0, photo: './article_2_front.jpg'},
    {id: 2, nom: 'Air Force 1 Low Metallic Chrome', prix: 250, reduc: 0.20, photo: './article_3_front.jpg'}
]

// permet d'ajouter le nombre d'article selon la valeur de ''quantité''
function addElement(e){
    indexArt = Array.from(new Set([...addPanier])).indexOf(e.target)
    
    for (let i = 1; i <= (parseInt(Qtn[indexArt].innerHTML) <=0 ? 1 : parseInt(Qtn[indexArt].innerHTML)); i++){
        Panier.push(allArticle[indexArt])
        console.log("ajouter => ",allArticle[indexArt],indexArt)
        console.log("valeur de i : ",i, parseInt(Qtn[indexArt].innerHTML))
    }
    Qtn[indexArt].innerHTML = 0
    localStorage.setItem(`panier`,JSON.stringify(Panier))
    displayNbrArticle(parseInt(Panier.length))
    afficherElements()
}
// ajouter au panier element selectionné
addPanier.forEach(element => {
    element.addEventListener('click',addElement)
})

// Affiche la bulle d'inforamtion pour le nombre d'articles dans le panier
function displayNbrArticle(nbr){
    if (!nbr == 0){
        nbrPanier.style.display = 'inline'
        nbrPanier.innerText = nbr
    }else{
        nbrPanier.style.display = 'none'  
    }
}

let articlePanier = document.querySelector('.elementsPanier')
let infoPanier = document.querySelector('.info-panier')

// Fonction qui permet d'afficher les articles du panier
function afficherElements(){
   articlePanier.innerHTML = ''
   if (Panier.length != 0){
       for (let i = 0; i < Panier.length; i++){
           var div = document.createElement("div")

           // Si l'article n'est pas en reduction 
           if (Panier[i].reduc == 0){
               div.innerHTML=`
               <div class="article-panier">
                   <img src="./exo_6/${Panier[i].photo}" alt="image du produit">
                   <div>
                       <p>${Panier[i].nom}</p>
                       <div class="article-quantité">
                           <p class="sup" onclick="delElement(${i})">enlever !</p>
                       </div>
                   </div>
                   <p>${Panier[i].prix} €</p>
               </div>
               `
            // Si l'article est en reduction 
           }else{
            let reduc = Panier[i].prix * (1 - Panier[i].reduc)
            div.innerHTML=`
               <div class="article-panier">
                   <img src="./exo_6/${Panier[i].photo}" alt="image du produit">
                   <div>
                       <p>${Panier[i].nom}</p>
                       <div class="article-quantité">
                           <p class="sup" onclick="delElement(${i})">enlever !</p>
                       </div>
                   </div>
                   <p><span class="reduc">${Panier[i].prix}€</span> ${reduc} €</p>
               </div>
               `
           }
           articlePanier.appendChild(div)
       }
       infoPanier.style.display = "flex"

       // clacul du total avec/sans reduction
       let sum = 0, sumReduc = 0
       Panier.forEach((element) => {
          sum += element.prix
          sumReduc += element.prix * (1 - element.reduc)
       })
       document.querySelector('.tarif').innerHTML = `Total : <span class="prix">${sum} €</span> Total avec reduction : <span class="prix">${sumReduc} €</span> `
   
    }else{
        
        infoPanier.style.display = "none"
        var div = document.createElement("div")
        div.innerHTML=`
           <p class="messPanier">Le panier est vide ! faites votre premier achat...<p>
           `
        articlePanier.appendChild(div)
   }
}

// Enlever l'element selectionné du panier
function delElement(index){
    Panier.splice(index, 1)
    localStorage.setItem(`panier`,JSON.stringify(Panier))
    afficherElements()
    displayNbrArticle(parseInt(Panier.length))
}


// Retire tout les elements du panier !
function delall(){
    console.log("delall !!!")
    Panier.splice(0, Panier.length)
    localStorage.setItem(`panier`,JSON.stringify(Panier))
    afficherElements()
    displayNbrArticle(parseInt(Panier.length))

}

// Appelle de la fonction au clique sur l'emelement qui à la class => vider
document.querySelector('.vider').addEventListener('click',delall)



/*  */
displayNbrArticle(parseInt(Panier.length))
afficherElements()
