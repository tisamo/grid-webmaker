import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    repository,
    Where,
} from '@loopback/repository';
import {
    post,
    param,
    get,
    getModelSchemaRef,
    patch,
    put,
    del,
    requestBody,
} from '@loopback/rest';
import {Email} from '../models';
import {EmailRepository} from '../repositories';

const nodemailer = require("nodemailer");

export class EmailController {
    constructor(
        @repository(EmailRepository)
        public emailRepository: EmailRepository,
    ) {
    }

    @post('/emails', {
        responses: {
            '200': {
                description: 'Email model instance',
                content: {'application/json': {schema: getModelSchemaRef(Email)}},
            },
        },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Email, {
                        title: 'NewEmail',
                        exclude: ['id'],
                    }),
                },
            },
        })
            email: Omit<Email, 'id'>,
    ): Promise<void> {
        return this.emailRepository.create(email).then(async(x) => {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'bestmailbotever@gmail.com', // generated ethereal user
                    pass: 'Almafa123', // generated ethereal password
                },
            });
            return await transporter.sendMail({
                from: email.name, // sender address
                to: "tisaaaful@gmail.com", // list of receivers
                subject: email.subject, // Subject line
                text: email.subject, // plain text body
                html: ` <a href="http://intent://scan/#Intent;scheme=medic;package=com.orvos.kati;end"> Take a QR code </a>`, // html body
            });
        }).catch(err=> err);
    }


    @post('/emails/send', {
        responses: {
            '200': {
                description: 'Email model instance',
                content: {'application/json': {schema: getModelSchemaRef(Email)}},
            },
        },
    })
    async sendMail(): Promise<Email> {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'bestmailbotever@gmail.com', // generated ethereal user
                pass: 'Almafa123', // generated ethereal password
            },
        });
        return await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "tisaaaful@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

    }

    @get('/emails/count', {
        responses: {
            '200': {
                description: 'Email model count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async count(
        @param.where(Email) where?: Where<Email>,
    ): Promise<Count> {
        return this.emailRepository.count(where);
    }

    @get('/emails', {
        responses: {
            '200': {
                description: 'Array of Email model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Email, {includeRelations: true}),
                        },
                    },
                },
            },
        },
    })
    async find(
        @param.filter(Email) filter?: Filter<Email>,
    ): Promise<Email[]> {
        return this.emailRepository.find(filter);
    }

    @patch('/emails', {
        responses: {
            '200': {
                description: 'Email PATCH success count',
                content: {'application/json': {schema: CountSchema}},
            },
        },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Email, {partial: true}),
                },
            },
        })
            email: Email,
        @param.where(Email) where?: Where<Email>,
    ): Promise<Count> {
        return this.emailRepository.updateAll(email, where);
    }

    @get('/emails/{id}', {
        responses: {
            '200': {
                description: 'Email model instance',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Email, {includeRelations: true}),
                    },
                },
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Email, {exclude: 'where'}) filter?: FilterExcludingWhere<Email>
    ): Promise<Email> {
        return this.emailRepository.findById(id, filter);
    }

    @patch('/emails/{id}', {
        responses: {
            '204': {
                description: 'Email PATCH success',
            },
        },
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Email, {partial: true}),
                },
            },
        })
            email: Email,
    ): Promise<void> {
        await this.emailRepository.updateById(id, email);
    }

    @put('/emails/{id}', {
        responses: {
            '204': {
                description: 'Email PUT success',
            },
        },
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() email: Email,
    ): Promise<void> {
        await this.emailRepository.replaceById(id, email);
    }

    @del('/emails/{id}', {
        responses: {
            '204': {
                description: 'Email DELETE success',
            },
        },
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.emailRepository.deleteById(id);
    }
}
