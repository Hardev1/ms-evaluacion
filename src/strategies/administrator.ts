import { AuthenticationStrategy } from '@loopback/authentication';
import { HttpErrors, Request } from '@loopback/rest';
import { UserProfile } from '@loopback/security';
import { Configuracion } from '../llaves/config';
import parseBearerToken from 'parse-bearer-token';
const fetch = require('node-fetch');

export class AdministratorStrategy implements AuthenticationStrategy {
    name: string = 'admin';
  
    constructor() {}
  
    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if (token) {
            let url = `${Configuracion.url_validar_token}?${Configuracion.arg_rol_validar}=${Configuracion.rol_administrador}&${Configuracion.arg_token}=${token}`;
            let respuesta = "";
            await fetch (url)
                .then(async (res:any) => {
                    respuesta = await res.text();
                })
            switch (respuesta) {
                case "OK":
                    let perfil: UserProfile = Object.assign({
                        admin: "OK"
                    });
                    return perfil;
                    break;
                
                case "KO":
                    throw new HttpErrors[401]("Tiene un token valido, sin embargo no es el rol correspondiente")
                    break;

                case "":
                    throw new HttpErrors[401]("El token enviado no existe")
                    break;
            }
        }
        else {
            throw new HttpErrors[401]("La solicitud no posee un token")
        }
    }
  }