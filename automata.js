


let maquina = require('./aut1.json');



let ingreso = "abababababababbbbbbbbbbbb";

let estadoActual = maquina.estadoInicial;

if(maquina.maquina == "AFD"){



// hacer chequeo de alfabeto


for(let i = 0; i < ingreso.length; i++){
    for(let j = 0; j < maquina.transiciones.length; j++){
        if(maquina.transiciones[j].actual == estadoActual && maquina.transiciones[j].valor == ingreso[i]){
            estadoActual = maquina.transiciones[j].proximo;
            break;
        }
    }
}

    for(let i = 0; i < maquina.estadosSalida.length; i++){
        if(estadoActual == maquina.estadosSalida[i]){
            console.log("Cadena correcta.");
            break;
        }
    }

}

if(maquina.maquina == "AP"){
    
    class pila{


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
    


    
}



