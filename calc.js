const zonetext = document.querySelector('.zone-text');

const tabBtnNumber=document.querySelectorAll(".btn-number");
const tabBtnOp = document.querySelectorAll(".btn-op");
const tabBtnPth = document.querySelectorAll(".btn-pth");
const btnEgal = document.querySelector("#btn-egal");
const btnClear=document.querySelector("#btn-clear");

const input=document.querySelector("input");




input.addEventListener("input", () => {
    input.value = input.value.replace(/[^0-9+\-*/().]/g, "");
});




for(let i=0 ;i<tabBtnNumber.length;i++){
    tabBtnNumber[i].addEventListener('click',()=>{let currenttext=zonetext.value ; 
                                            zonetext.value= currenttext + tabBtnNumber[i].textContent;
    });

}

for(let i=0 ;i<tabBtnOp.length;i++){
    tabBtnOp[i].addEventListener('click',()=>{let currenttext=zonetext.value ; 
                                            zonetext.value= currenttext + tabBtnOp[i].textContent;
    });

}

for(let i=0 ;i<tabBtnPth.length;i++){
    tabBtnPth[i].addEventListener('click',()=>{let currenttext=zonetext.value ; 
                                            zonetext.value= currenttext + tabBtnPth[i].textContent;
    });

}


btnEgal.addEventListener('click' , ()=>{
    input.value = evalInput(input.value);
});


function userPressEnter(event){
    if(event.key ==="Enter")
        input.value = evalInput(input.value);
}
input.addEventListener('keypress',userPressEnter);


btnClear.addEventListener('click',()=>{
    input.value= "";
});









function evalInput(str){
    return evalTab(textToTab(str));

}



function somme(a,b){
    return a+b;
}


function produit(a,b){
    return a*b;
}


function division(a,b){

    if(b !== 0)
        return a/b;

    return 0;
}


function moins(a,b){
    return a-b;
}


function puissance(a,b){
    return a ** b;
}


// transforme un texte en tableau d'opérations
function textToTab(str){

    let res=[];

    if(str[0] === "-"){
        res.push(0);
    }

    for(let i=0;i<str.length;i++){

        if(!isNaN(Number(str[i])) || str[i]==="."){

            let nb="";

            while(i < str.length && (!isNaN(Number(str[i])) || str[i]===".")){

                nb += str[i];
                i++;

            }

            res.push(Number(nb));

            i--;
        }

        else{

            res.push(str[i]);

        }

    }

    return res;
}



// évalue une partie sans parenthèses
function evalSimple(tab){

    // priorité puissance

    for(let i=0;i<tab.length;i++){

        if(tab[i] === "^"){

            let resultat = puissance(tab[i-1], tab[i+1]);

            tab.splice(i-1,3,resultat);

            i=-1;
        }

    }


    // priorité multiplication et division

    for(let i=0;i<tab.length;i++){

        if(tab[i] === "*" || tab[i] === "/"){


            let resultat;


            if(tab[i] === "*")
                resultat = produit(tab[i-1],tab[i+1]);

            else
                resultat = division(tab[i-1],tab[i+1]);


            tab.splice(i-1,3,resultat);


            i=-1;
        }

    }



    // addition et soustraction

    for(let i=0;i<tab.length;i++){

        if(tab[i] === "+" || tab[i] === "-"){


            let resultat;


            if(tab[i] === "+")
                resultat = somme(tab[i-1],tab[i+1]);

            else
                resultat = moins(tab[i-1],tab[i+1]);


            tab.splice(i-1,3,resultat);


            i=-1;

        }

    }


    return tab[0];

}



// gestion des parenthèses
function evalParentheses(tab){


    for(let i=0;i<tab.length;i++){


        if(tab[i] === ")"){


            let debut=i;


            while(tab[debut] !== "("){

                debut--;

            }



            let sousTab = tab.slice(debut+1,i);



            let resultat = evalTab(sousTab);



            tab.splice(debut,i-debut+1,resultat);



            i=-1;

        }

    }


    return tab;

}



// fonction principale
function evalTab(tab){


    tab = evalParentheses(tab);


    return evalSimple(tab);

}