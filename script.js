const selezionata = {};                                           
const boxes = document.querySelectorAll('.choice-grid div');    

for (const box of boxes) {
    box.addEventListener('click', Click);                 
}


function Click(event){ //evidenzia il blocco selezionato e opacizza gli altri
    const box = event.currentTarget;
    const risp_data = box.dataset.choiceId;
    const risposte = box.parentNode.querySelectorAll('div');

    box.querySelector('.checkbox').src = "checked.png";
    box.classList.add('seleziona');
    box.classList.remove('opacita');
   
    for (const risposta of risposte) {
        if(risposta.dataset.choiceId !== risp_data){
            risposta.classList.add('opacita');
            risposta.querySelector('.checkbox').src = "unchecked.png";
            risposta.classList.remove('seleziona');
        }
    }

    selezionata[box.dataset.questionId] = box.dataset.choiceId;

    if(selezionata.one && selezionata.two && selezionata.three){
        for (const box of boxes) 
            box.removeEventListener('click',Click);
       Mostra(Scegli());
    } 
}

function Scegli(){
    if(selezionata.one === selezionata.two || selezionata.one === selezionata.three)
        return selezionata.one;
    else if(selezionata.two === selezionata.one || selezionata.two === selezionata.three)
        return selezionata.two;
    else if(selezionata.three === selezionata.one || selezionata.three === selezionata.two)
        return selezionata.three;
    return selezionata.one;
}


function Mostra(key){ //visualizza il risultato e ricomincia
    const visualizza = document.querySelector('#risultato');
    visualizza.querySelector('h1').textContent = RESULTS_MAP[key].title;
    visualizza.querySelector('p').textContent = RESULTS_MAP[key].contents;
    visualizza.classList.remove('result');
    const tasto = document.querySelector('#tasto');
    tasto.addEventListener('click', Ricomincia);
}


function Ricomincia(){ //resetta test
    for (const key in selezionata) {
        delete selezionata[key];
    } 
    const blocco = document.querySelector('#risultato');
    blocco.classList.add('result');


    for (const box of boxes) {
        box.classList.remove('seleziona');
        box.classList.remove('opacita');
        box.addEventListener('click', Click);
        box.querySelector('.checkbox').src = "unchecked.png";
    }
}