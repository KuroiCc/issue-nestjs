import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DogsResolver } from './dogs/dogs.resolver';
import { CatsController } from './cats/cats.controller';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    switch (context.getClass().name) {
      case CatsController.name: {
        const { user } = context.switchToHttp().getRequest();
      }

      // ! this will be error if you try to access DogsResolver in any way
      case DogsResolver.name: {
        const { user } = GqlExecutionContext.create(context).getContext().req;
      }
    }

    console.log(context.getClass().name);
    return true;
  }
}
