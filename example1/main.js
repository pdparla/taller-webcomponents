// Dentro de un elemento, tenemos distintos tipos de callbacks
/*

    - connectedCallback: Se invoca cada vez que se añade un elemento personalizado a un documento. Esto ocurrirá cada vez que el nodo se mueva, y puede suceder antes de que todo el contenido se haya parseado.

    - disconnectedCallback: Se invoca cada vez que el elemento se desconecta del DOM del documento.
    - adoptedCallback: Se invoca cada vez que el elemento se mueve a un nuevo documento.
    - attributeChangedCallback: Se invoca cada vez que los atributos del elemento se añaden, quitan o cambian. 
      Deben especificarse previamente en el método estático observedAttributes los atributos que queremos que nos sean notificados.

*/ 

// Ejemplo de: https://github.com/powerhdeleon/100DaysAsAFrontendDev/tree/master/Semana10-WebComponents


class List extends HTMLElement{
    constructor(){
        super();
        // Creamos un shadow root
        let shadow = this.attachShadow({mode: 'open'});

        // Creamos un elemento div para el header
        this.divHeader = document.createElement("div");
        // Creamos un elemento div para el contenido
        this.divContent = document.createElement("div");
        // Añadimos los elementos al shadow root
        shadow.appendChild(this.divHeader);
        shadow.appendChild(this.divContent);
        

    }

    /*
        getResultado: Obtiene el resultado de la petición a la API 
    */
    async getResult(url){
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    /**
     * connectedCallback: Se invoca cada vez que se añade un elemento personalizado a un documento. 
     * Esto ocurrirá cada vez que el nodo se mueva, y puede suceder antes de que todo el contenido se haya parseado.
     */
    async connectedCallback () {
        // Añadimos titulo al header
        this.divHeader.innerHTML= `<strong>
            ${this.getAttribute("data-title")}
        </strong>`


        // Obtenemos el resultado de la petición a la API
        let url = this.getAttribute("data-url");
        let result = await this.getResult(url);
        
        
        // Por cada elemento del resultado, creamos un elemento figure con una imagen y lo añadimos al divContent
        this.divContent.innerHTML = "";
        let field = this.getAttribute("data-field");

        result.forEach(element => {
                this.divContent.innerHTML += `
                <figure>
                <img
                src='${element[field]}'
                title='${element['title']}'>
                </img>
                <figcaption>${element['title']}</figcaption>
                </figure>`
        });
    }
}

customElements.define("app-list", List);