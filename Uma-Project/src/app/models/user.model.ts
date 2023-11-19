export interface User {
    id: any;
    nombres: any;
    apellidos: any;
    telefono: any;
    credencial: {
        correo: any;
        contrasena: any;
    }
    localidad : {
        direccion: any;
        pais: any;
        ciudad: any;
    }
}