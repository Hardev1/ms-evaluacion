import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {Keys} from '../config/keys';
const fetch = require('node-fetch');
var jwt = require('jsonwebtoken');

export class AdministratorStrategy implements AuthenticationStrategy {
    name: string = 'Administrador';

    constructor() { }

    async authenticate(request: Request): Promise<UserProfile | undefined> {
        let token = parseBearerToken(request);
        if (token) {
            let respuesta = "";
            try {
                var decoded = jwt.verify(token, Keys.JWT_SECRET_KEY);
                let perfil: UserProfile = Object.assign({
                    admin: "OK"
                });
                return perfil;
            } catch {
                throw new HttpErrors[401]("Tiene un token valido, sin embargo no es el rol correspondiente")
            }
        }
        else {
            throw new HttpErrors[401]("La solicitud no posee un token")
        }
    }
}
