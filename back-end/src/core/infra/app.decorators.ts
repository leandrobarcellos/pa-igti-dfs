import {Controller} from "@nestjs/common";

export const Path = (path: string = '') => Controller(`e-catequese${path}`)
