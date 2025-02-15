/* eslint-disable prettier/prettier */
import { ExecutionContext, createParamDecorator} from "@nestjs/common"

export const UserEmail = createParamDecorator(
    
        (data:unknown, ctx: ExecutionContext) =>{
            const request = ctx.switchToHttp().getRequest();
            return request.user?.email;
        }
    
)