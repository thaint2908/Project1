import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    InternalServerErrorException
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {auth} from 'firebase-admin';

import {Role} from "../enums/role.enum";
import {ROLES_KEY} from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const authorization = context.switchToHttp().getRequest().headers['authorization'];
        if (!authorization) {
            throw new UnauthorizedException();
        }

        const token = authorization.replace('Bearer ', '').trim();

        try {
            const decodedToken = await auth().verifyIdToken(token);
            const role = decodedToken['role'];

            return requiredRoles.includes(role);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
