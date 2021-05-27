 // Inicializar nustra aplicacion en Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDU82IPqUq6gmoDgUoZ7FMxUMdLJlD3j6k",
    authDomain: "exemenu2.firebaseapp.com",
    projectId: "exemenu2",
});

// Agregar registro

var db = firebase.firestore();

function Agregar() {
    var Nombre = document.getElementById('Nombre').value;
    var Apellido1 = document.getElementById('ApellidoP').value;
    var Apellido2 = document.getElementById('ApellidoM').value;
    var CURP = document.getElementById('Curp').value;
    var Edad = document.getElementById('Edad').value;
    var Domicilio = document.getElementById('Domicilio').value;
    var Municipio = document.getElementById('Municipio').value;


    console.log(Nombre, Apellido1, Apellido2, CURP, Edad, Domicilio, Municipio);
    db.collection("users").add({
        name: Nombre,
        last1: Apellido1,
        last2: Apellido2,
        Curp: CURP,
        edad: Edad,
        domicilio: Domicilio,
        municipio: Municipio
    })
    .then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('Nombre').value ='';
        document.getElementById('ApellidoP').value = '';
        document.getElementById('ApellidoM').value ='';
        document.getElementById('Curp').value = '';
        document.getElementById('Edad').value = '';
        document.getElementById('Domicilio').value = '';
        document.getElementById('Municipio').value = '';

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

//Codigo Para mostrar los registros en mi tabla web
//Comenzamos en leer el ID de la tabla para poder agregarse 

var Tabla = document.getElementById('Tabla');

db.collection("users").onSnapshot((querySnapshot) => {
            Tabla.innerHTML = '';//limpia mi tabla
            querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data().last1}`);
            Tabla.innerHTML += `
            <tr>
                <th scope="row">${doc.id}</th> 
                <td>${doc.data().name}</td>
                <td>${doc.data().last1}</td>
                <td>${doc.data().last2}</td>
                <td>${doc.data().Curp}</td>
                <td>${doc.data().edad}</td>
                <td>${doc.data().domicilio}</td>
                <td>${doc.data().municipio}</td>
                <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')"><i class="far fa-trash-alt"></i> Eliminar</button></td>
                <td><button class="btn btn-warning " onclick="editar('${doc.id}', '${doc.data().name}', '${doc.data().last1}', '${doc.data().last2}', '${doc.data().Curp}', '${doc.data().edad}', '${doc.data().domicilio}', '${doc.data().municipio}')"><i class="fas fa-user-edit"></i>Editar</button></td>
            </tr>

            `
        });
    });

//Eliminar un usuario 
function eliminar(id) {
    db.collection("users").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}

//Editar un usuario o documento
function editar(id, Nombre, Apellido1, Apellido2, CURP, Edad, Domicilio, Municipio) {
    console.log(id);
    var Nombre = document.getElementById('Nombre').value = Nombre;
    var Apellido1 = document.getElementById('ApellidoP').value = Apellido1;
    var Apellido2 = document.getElementById('ApellidoM').value = Apellido2;
    var CURP = document.getElementById('Curp').value = CURP;
    var Edad = document.getElementById('Edad').value = Edad;
    var Domicilio = document.getElementById('Domicilio').value = Domicilio;
    var Municipio = document.getElementById('Municipio').value = Municipio;
    var boton = document.getElementById('Boton');

    boton.innerHTML = 'Editar';

    boton.onclick = function (){
        var washingtonRef = db.collection("users").doc(id);

        var Nombre = document.getElementById('Nombre').value;
        var Apellido1 = document.getElementById('ApellidoP').value;
        var Apellido2 = document.getElementById('ApellidoM').value;
        var CURP = document.getElementById('Curp').value;
        var Edad = document.getElementById('Edad').value;
        var Domicilio = document.getElementById('Domicilio').value;
        var Municipio = document.getElementById('Municipio').value;

        return washingtonRef.update({
            name: Nombre,
            last1: Apellido1,
            last2: Apellido2,
            Curp: CURP,
            edad: Edad,
            domicilio: Domicilio,
            municipio: Municipio
        })
        .then(() => {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Agregar';
            document.getElementById('Nombre').value = '';
            document.getElementById('ApellidoP').value = '';
            document.getElementById('ApellidoM').value = '';
            document.getElementById('Curp').value = '';
            document.getElementById('Edad').value = '';
            document.getElementById('Domicilio').value = '';
            document.getElementById('Municipio').value = '';
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
} 

function redirect()
    {
    var url = "https://www.facebook.com/";
    window.location(url);
    }


    
