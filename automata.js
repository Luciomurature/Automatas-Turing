function datos(e) {
    var file = jsonFile.files[0];
    var reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function(e) {
        maquina = JSON.parse(reader.result);
    };

};


function init(){


    let ingreso = document.getElementById('entrada').value;
    let estadoActual = maquina.estadoInicial;



    if(maquina.tipo == "AFD"){

        for(let i = 0; i < ingreso.length; i++){
            for(let j = 0; j < maquina.transiciones.length; j++){
                if(maquina.transiciones[j].actual == estadoActual && maquina.transiciones[j].valor == ingreso[i]){
                    estadoActual = maquina.transiciones[j].proximo;
                    break;
                }
            }
        }

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
                    if(maquina.transiciones[j].apilar == "L"){
                        pila.pop();
                        if(pila.items.length == 1){
                            if(i == ingreso.length - 1){
                                for(let k = 0; k < maquina.transiciones.length; k++){
                                    if(maquina.transiciones[k].valor == "L"){
                                        estadoActual = maquina.transiciones[k].proximo;
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



    }
    for(let i = 0; i < maquina.estadosSalida.length; i++){
        if(estadoActual == maquina.estadosSalida[i]){
            alert("Cadena correcta");
            break;
        }
        if(estadoActual != maquina.estadosSalida[i] && maquina.estadosSalida[i] == maquina.estadosSalida[maquina.estadosSalida.length - 1]){ //si mi estado no es un estado de salida, y estoy en el ultimo estado de salida, entonces chau
            alert("Cadena incorrecta");
            break;
        }
    }


    
}


