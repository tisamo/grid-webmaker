import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Layout extends Entity {
    @property({
        type: 'number',
        id: true,
        generated: true,
    })
    id?: number

    @property({
        type: 'number',
        required: true,
    })
    rows: number;

    @property({
        type: 'number',
        required: true,
    })
    cols: number;

    @property({
        type: 'number',
        required: true,
    })
    y: number;

    @property({
        type: 'number',
        required: true,
    })
    x: number;

    @property({
        type: 'string',
        required: false,
    })
    componentRef: string;

    @property({
        type: 'string',
        required: false,
        default:''
    })
    input: string;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Layout>) {
        super(data);
    }
}

export interface LayoutRelations {
    // describe navigational properties here
}

export type LayoutWithRelations = Layout & LayoutRelations;
