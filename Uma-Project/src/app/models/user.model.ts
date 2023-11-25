export interface User {
    _id: any;
    nombres: any;
    apellidos: any;
    telefono: any;
    credencial: {
        correo: any;
        password: any;
    }
    localidad : {
        direccion: any;
        pais: any;
        ciudad: any;
    }
    foto: any;
}