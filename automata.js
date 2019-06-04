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



    if(maquina.tipo == "AFD"){


        let estadoActual = maquina.estadoInicial;


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
                alert("Cadena correcta.");
                break;
            }
            if(estadoActual != maquina.estadosSalida[i] && maquina.estadosSalida[i] == maquina.estadosSalida[maquina.estadosSalida.length - 1]){
                alert("Cadena Incorrecta");
                return;
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
        let estadoActual = maquina.estadoInicial;


        for(let i = 0; i < ingreso.length; i++){
            for(let j = 0; j < maquina.transiciones.length; j++){
                if(maquina.transiciones[j].actual == estadoActual && maquina.transiciones[j].tope == pila.peek() && ingreso[i] == maquina.transiciones[j].valor ){
                    if(maquina.transiciones[j].apilar == "L"){
                        pila.pop();
                        if(pila.length == 1 && i == ingreso.lenght-1){  //si tiene solo el simbolo de vacio  y la letra es la ultima   
                            for(let k = 0; k < maquina.transiciones.length; k++){
                                if(maquina.transiciones[k].valor == "L"){
                                    estadoActual = maquina.transiciones[k].proximo;
                                    break;
                                }
                            }
                        }
                    }
                    else{
                        pila.push(maquina.transiciones[j].apilar);
                    }
                    estadoActual = maquina.transiciones[j].proximo;
                    break;
                }
            }
        }

        if(pila.isEmpty()){
            alert("ok");
        }


    }


}
