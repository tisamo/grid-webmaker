import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Socials extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  link: string;

  @property({
    type: 'string',
    required: true,
  })
  image: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Socials>) {
    super(data);
  }
}

export interface SocialsRelations {
  // describe navigational properties here
}

export type SocialsWithRelations = Socials & SocialsRelations;
