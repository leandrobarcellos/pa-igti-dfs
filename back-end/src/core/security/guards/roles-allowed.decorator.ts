import { SetMetadata } from '@nestjs/common';

export const RolesAllowed = (...roles: string[]) => SetMetadata('roles', roles);