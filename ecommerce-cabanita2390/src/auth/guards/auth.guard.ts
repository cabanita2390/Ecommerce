import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

//Funcion validadora
function validate(request: Request) {
  const authHeader = request.headers?.authorization;
  //Basic: email:password
  const auth = authHeader.split(' ')[1]; //['Basic:', 'email:password']
  if (!auth) return false;

  const [email, password] = auth.split(':');
  if (!email || !password) return false;

  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validate(request);
  }
}
