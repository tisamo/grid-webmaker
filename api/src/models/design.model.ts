import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Design extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number;

    @property({
        type: 'string',
        required: true,
    })
    mode: string;

    @property({
        type: 'string',
    })
    color?: string;

    @property({
        type: 'string',
    })
    backgroundImage?: string;

    @property({
        type: 'string',
    })
    textColor?: string;

    @property({
        type: 'string',
    })
    height?: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Design>) {
        super(data);
    }
}

export interface DesignRelations {
    // describe navigational properties here
}

export type DesignWithRelations = Design & DesignRelations;
