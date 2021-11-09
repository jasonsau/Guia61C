/*
 * Guia 61
 * Grupo 08
 * Jason Saul Martinez Argueta
 * MA17902
 */

const idForm = document.getElementById("idAdd");
const idButtonAdd = document.getElementById("idButtonAdd");
const idInputTitle = document.getElementById("idInputTitle");
const idInputPrice = document.getElementById("idInputPrice");
const idInputDescription = document.getElementById("idInputDescription");
const idInputImage = document.getElementById("idInputImage");
const idInputCategory = document.getElementById("idInputCategory");
const idTabla = document.getElementById("tabla");


var fila=`
    <tr>
        <td class='id main-container__td'></td>
        <td class='foto main-container__td'></td>
        <td class='price main-container__td'></td>
        <td class='title main-container__td'></td>
        <td class='description main-container__td'></td>
        <td class='category main-container__td'></td>
        <td class = 'action main-container__td'></td>
    </tr>`;

var productos=null;
function codigoCat(catstr) {
    var code="null";
    switch(catstr) { 
        case "electronicos":code="c1";break;
        case "joyeria":code="c2";break;
        case "caballeros":code="c3";break;
        case "damas":code="c4";break;
    }
    return code;
}   
var orden=0;
	  
  
function listarProductos(productos) { 
    var precio=document.getElementById("price"); 
    precio.setAttribute("onclick", "orden*=-1;listarProductos(productos);");
    var num=productos.length;
    var listado=document.getElementById("listado");
    var ids,titles,prices,descriptions,categories,fotos;
    var tbody=document.getElementById("tbody"),nfila=0;
    tbody.innerHTML="";
    var catcode;
    for(i=0;i<num;i++) tbody.innerHTML+=fila;
    var tr; 
    ids=document.getElementsByClassName("id");
    titles=document.getElementsByClassName("title");
    descriptions=document.getElementsByClassName("description");
    categories=document.getElementsByClassName("category");   
    fotos=document.getElementsByClassName("foto");   
    prices=document.getElementsByClassName("price");   
    const actions = document.getElementsByClassName("action");
    if(orden===0) {
        orden=-1;precio.innerHTML="Precio"
    } else {
        if(orden==1) {
            ordenarAsc(productos,"price");
            precio.innerHTML="Precio A";
            precio.style.color="darkgreen"
        } else  {
            if(orden==-1) {
                ordenarDesc(productos,"price");
                precio.innerHTML="Precio D";
                precio.style.color="blue"
            }
        }

    }

    listado.style.display="block";
    idAdd.style.display = "block";
    for(nfila=0;nfila<num;nfila++) {
        ids[nfila].innerHTML=productos[nfila].id;
        titles[nfila].innerHTML=productos[nfila].title;
        descriptions[nfila].innerHTML=productos[nfila].description;
        categories[nfila].innerHTML=productos[nfila].category;
        catcode=codigoCat(productos[nfila].category);
        tr=categories[nfila].parentElement;
        tr.setAttribute("class",catcode);
        prices[nfila].innerHTML="$"+productos[nfila].price;
        fotos[nfila].innerHTML=`<img class = "img" src="${productos[nfila].image}">`;
        fotos[nfila].firstChild.setAttribute("onclick","window.open('"+productos[nfila].image+"');" );
        actions[nfila].innerHTML = `<a href = "#" value = ${productos[nfila].id} option = "eliminar">Eliminar</a>`;
    }
}

function obtenerProductos() {
	  fetch(' https://retoolapi.dev/Aj5zyL/productos')
            .then(res=>res.json())
            .then(data=>{productos=data;listarProductos(data)})
}

function ordenarDesc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return -1;
if(a[p_key] < b[p_key]) return 1;
return 0;
   });
}

function ordenarAsc(p_array_json, p_key) {
   p_array_json.sort(function (a, b) {
      if(a[p_key] > b[p_key]) return 1;
if(a[p_key] < b[p_key]) return -1;
return 0;
   });
}



idButtonAdd.addEventListener('click', () => {
    const data = {
        "title": idInputTitle.value,
        "price": idInputPrice.value,
        "image": idInputImage.value,
        "description": idInputDescription.value,
        "category": idInputCategory.value
    };

    fetch('https://retoolapi.dev/Aj5zyL/productos', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(response => response.json())
    .then(data => {
        obtenerProductos();
    })
    .catch(error => console.log(error));
});

tabla.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.getAttribute('option') === 'eliminar') {
    fetch(`https://retoolapi.dev/Aj5zyL/productos/${e.target.getAttribute('value')}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        obtenerProductos();
    })
    .catch(error => console.log(error));

        console.log("Se quiere eliminar");
    }


});
