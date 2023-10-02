const btn = document.querySelectorAll('.btn')
const elementShop = document.querySelectorAll('.content')

for (i = 0; i < btn.length; i++){ 
    var changeColor = function(){
        for (i = 0; i < btn.length; i++){
            if (btn[i] == this){
               elementShop[i].classList.add('active')
            } else {
                elementShop[i].classList.remove('active')
            }
            console.log('ok')
        }
    }
    btn[i].addEventListener('click',changeColor)
}