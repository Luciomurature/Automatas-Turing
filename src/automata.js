



function datos(e) {
    var file = jsonFile.files[0];
    var reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function(e) {
        maquina = JSON.parse(reader.result);
    };

};

//GLOBALS


 let estadoActual;
 let estadosPasados = []; //para hacer la animacion
 let ingreso;




function init(){


    

    if(maquina.tipo != "MT"){
        ingreso = document.getElementById('entrada').value;
        if(!verificarAlfabeto()){
            return alert("Cadena erronea en alfabeto");
        }
    }

    estadoActual = maquina.estadoInicial;



    



    if(maquina.tipo == "AFD"){

        for(let i = 0; i < ingreso.length; i++){
            for(let j = 0; j < maquina.transiciones.length; j++){
                if(maquina.transiciones[j].actual == estadoActual && maquina.transiciones[j].valor == ingreso[i]){
                    estadoActual = maquina.transiciones[j].proximo;
                    estadosPasados.push(estadoActual);
                    break;
                }
            }
        }
        resultado();
    }

    if(maquina.tipo == "AP"){

        class Pila{


            constructor(){
                this.items = [];
            }
            push(element){
                this.items.push(element);
            }
            pop() {

                if (this.items.length == 0)
                    return "Underflow";
                return this.items.pop();
            }

            isEmpty() {
                return this.items.length == 0;
            }

            peek(){
                return this.items[this.items.length - 1];
            }
        }

        let pila = new Pila();
        pila.push(maquina.simboloVacio);


        for(let i = 0; i < ingreso.length; i++){
            for(let j = 0; j < maquina.transiciones.length; j++){
                if(maquina.transiciones[j].actual == estadoActual && maquina.transiciones[j].tope == pila.peek() && ingreso[i] == maquina.transiciones[j].valor ){
                    estadoActual = maquina.transiciones[j].proximo;
                    estadosPasados.push(estadoActual);
                    if(maquina.transiciones[j].apilar == "L"){
                        pila.pop();
                        if(pila.items.length == 1){
                            if(i == ingreso.length - 1){
                                for(let k = 0; k < maquina.transiciones.length; k++){
                                    if(maquina.transiciones[k].valor == "L"){
                                        estadoActual = maquina.transiciones[k].proximo;
                                        estadosPasados.push(estadoActual);
                                        break;
                                    }
                                }
                            }
                        }
                    }else{
                        pila.push(maquina.transiciones[j].apilar);
                    }
                    break;
                }
            }

        }


        resultado();
    }


    if(maquina.tipo == "MT"){
            let cinta = [];
            let cabezal = maquina.inicioCabezal;
            
        
            //cargo los datos de la cinta en mi cinta javascripteana 
        
            for(let i = 0; i < maquina.cinta.length; i++){
                cinta[i] = maquina.cinta[i];
            }
        
            do{
        
            for(let i = 0; i < maquina.transiciones.length; i++){
                if(estadoActual == maquina.transiciones[i].actual && cinta[cabezal] == maquina.transiciones[i].leo){
                    cinta[cabezal] = maquina.transiciones[i].escribo;
                    if(maquina.transiciones[i].movimiento == "D") cabezal++;
                    if(maquina.transiciones[i].movimiento == "I") cabezal--;
                    estadoActual = maquina.transiciones[i].proximo;
                }
            }
        }while(estadoActual != maquina.estadoSalidaTuring);
            document.getElementById("results").innerHTML =  cinta;
        }

    
}

function verificarAlfabeto(){
    let verificacion = false;

    for(let i = 0; i < ingreso.length; i++){
        verificacion = false;
        for(let j = 0; j < maquina.alfabeto.length; j++){
            if(ingreso[i] == maquina.alfabeto[j]){
                verificacion = true;
                break;
            }
            if(ingreso[i] != maquina.alfabeto[j] && maquina.alfabeto[j] == maquina.alfabeto[maquina.alfabeto.length -1]){
                return false;
            }
        }
    }

    return verificacion;
}

function resultado(){
    for(let i = 0; i < maquina.estadosSalida.length; i++){
        if(estadoActual == maquina.estadosSalida[i]){
            document.getElementById("results").innerHTML =  "Cadena correcta";
            break;
        }
        if(estadoActual != maquina.estadosSalida[i] && maquina.estadosSalida[i] == maquina.estadosSalida[maquina.estadosSalida.length - 1]){ //si mi estado no es un estado de salida, y estoy en el ultimo estado de salida, entonces chau
            document.getElementById("results").innerHTML =  "Cadena incorrecta";
            break;
        }
    }

}


function setup(){
    let myCanvas = createCanvas(1000,1000);
    noLoop();
}


function draw(){
    let dist = 150;
    let circles = [];

    for(let i = 0 ; i < maquina.estados.length; i++, dist += 150){
         if(1 == i){
             line(50, 80, 117.5, 80); //linea de flecha
             line(100, 88, 117.5, 80); //punta de flecha desde arriba
             line(100, 72, 117.5, 80); //punta de flecha desde abajo
         }
        if(maquina.tipo == "MT"){
            for(let j = 0; j < maquina.estadoSalidaTuring.length; j++){
                if(maquina.estados[i] == maquina.estadoSalidaTuring[j]){
                    ellipse(dist, 80, 85, 85);
                    circles[i] = ellipse(dist, 80, 65, 65);
                }else{
                    circles[i] = ellipse(dist, 80, 65, 65); //estado
                }
            }

        }else{
        for(let j = 0; j < maquina.estadosSalida.length; j++){
            if(maquina.estados[i] == maquina.estadosSalida[j]){
                ellipse(dist, 80, 85, 85);
                circles[i] = ellipse(dist, 80, 65, 65);
            }else{
                circles[i] = ellipse(dist, 80, 65, 65); //estado
            }
        }
    }


        text(maquina.estados[i], dist-8, 83); // nombre

        

    
        //transiciones
        if(maquina.tipo == "AFD"){
        //stuff
        }
        if(maquina.tipo == "AP"){
            //other stuff
        }
    }

 }
 

function gfx(){
    setup();
    clear();
    draw();

    
}



