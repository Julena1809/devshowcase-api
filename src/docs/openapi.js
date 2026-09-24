const errorResponse = (description) => ({
  description,
  content: {
    'application/json': { schema: { $ref: '#/components/schemas/Error' } }
  }
});

const idParam = {
  name: 'id',
  in: 'path',
  required: true,
  schema: { type: 'integer', example: 1 }
};

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'DevShowcase API',
    version: '1.0.0',
    description:
      'API para desenvolvedores cadastrarem perfis, tecnologias e projetos, e receberem feedbacks e upvotes.'
  },
  tags: [
    { name: 'Profiles' },
    { name: 'Technologies' },
    { name: 'Projects' }
  ],
  paths: {
    '/api/profiles': {
      post: {
        tags: ['Profiles'],
        summary: 'Cria um perfil',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProfileInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Perfil criado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Profile' } }
            }
          },
          400: errorResponse('Dados inválidos'),
          409: errorResponse('E-mail já cadastrado')
        }
      }
    },

    '/api/profiles/{id}': {
      get: {
        tags: ['Profiles'],
        summary: 'Busca um perfil pelo id',
        parameters: [idParam],
        responses: {
          200: {
            description: 'Perfil encontrado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Profile' } }
            }
          },
          400: errorResponse('ID inválido'),
          404: errorResponse('Perfil não encontrado')
        }
      }
    },

    '/api/technologies': {
      post: {
        tags: ['Technologies'],
        summary: 'Cria uma tecnologia',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/TechnologyInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Tecnologia criada',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Technology' } }
            }
          },
          400: errorResponse('Dados inválidos'),
          409: errorResponse('Tecnologia já cadastrada')
        }
      },
      get: {
        tags: ['Technologies'],
        summary: 'Lista as tecnologias em ordem alfabética',
        responses: {
          200: {
            description: 'Lista de tecnologias',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Technology' }
                }
              }
            }
          }
        }
      }
    },

    '/api/projects': {
      post: {
        tags: ['Projects'],
        summary: 'Cria um projeto vinculado a um perfil e a tecnologias',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ProjectInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Projeto criado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Project' } }
            }
          },
          400: errorResponse('Dados inválidos, ou perfil/tecnologia inexistente')
        }
      },
      get: {
        tags: ['Projects'],
        summary: 'Lista projetos com filtro por tecnologia e paginação',
        parameters: [
          {
            name: 'technology',
            in: 'query',
            description: 'Nome da tecnologia (não diferencia maiúsculas de minúsculas)',
            schema: { type: 'string', example: 'Node.js' }
          },
          {
            name: 'page',
            in: 'query',
            schema: { type: 'integer', minimum: 1, default: 1 }
          },
          {
            name: 'limit',
            in: 'query',
            description: 'Itens por página (máximo 50)',
            schema: { type: 'integer', minimum: 1, maximum: 50, default: 10 }
          }
        ],
        responses: {
          200: {
            description: 'Lista paginada de projetos',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/Project' }
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: { type: 'integer', example: 1 },
                        limit: { type: 'integer', example: 10 },
                        total: { type: 'integer', example: 3 },
                        totalPages: { type: 'integer', example: 1 }
                      }
                    }
                  }
                }
              }
            }
          },
          400: errorResponse('Parâmetros inválidos')
        }
      }
    },

    '/api/projects/{id}/feedbacks': {
      post: {
        tags: ['Projects'],
        summary: 'Registra um feedback e recalcula a nota média do projeto',
        parameters: [idParam],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/FeedbackInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Feedback registrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string', example: 'Feedback registrado com sucesso.' },
                    averageRating: { type: 'number', example: 4 }
                  }
                }
              }
            }
          },
          400: errorResponse('ID inválido ou nota fora do intervalo de 1 a 5'),
          404: errorResponse('Projeto não encontrado')
        }
      }
    },

    '/api/projects/{id}/upvote': {
      put: {
        tags: ['Projects'],
        summary: 'Incrementa em 1 as curtidas do projeto',
        parameters: [idParam],
        responses: {
          200: {
            description: 'Upvote registrado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'integer', example: 1 },
                    title: { type: 'string', example: 'Meu Portfólio' },
                    upvotes: { type: 'integer', example: 1 }
                  }
                }
              }
            }
          },
          400: errorResponse('ID inválido'),
          404: errorResponse('Projeto não encontrado')
        }
      }
    }
  },

  components: {
    schemas: {
      Error: {
        type: 'object',
        properties: {
          status: { type: 'integer', example: 400 },
          error: { type: 'string', example: 'Dados inválidos.' },
          details: {
            type: 'array',
            description: 'Presente apenas em erros de validação',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'rating' },
                message: { type: 'string', example: 'A nota deve ser no máximo 5' }
              }
            }
          }
        }
      },
      ProfileInput: {
        type: 'object',
        required: ['name', 'email'],
        properties: {
          name: { type: 'string', example: 'Ana Souza' },
          email: { type: 'string', format: 'email', example: 'ana@email.com' },
          bio: { type: 'string', example: 'Dev backend' }
        }
      },
      Profile: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Ana Souza' },
          email: { type: 'string', example: 'ana@email.com' },
          bio: { type: 'string', nullable: true, example: 'Dev backend' }
        }
      },
      TechnologyInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'Node.js' },
          description: { type: 'string', example: 'Runtime JavaScript' }
        }
      },
      Technology: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Node.js' },
          description: { type: 'string', nullable: true, example: 'Runtime JavaScript' }
        }
      },
      ProjectInput: {
        type: 'object',
        required: ['title', 'description', 'pdfUrl', 'profileId', 'technologyIds'],
        properties: {
          title: { type: 'string', example: 'Meu Portfólio' },
          description: { type: 'string', example: 'Site com meus projetos' },
          pdfUrl: { type: 'string', format: 'uri', example: 'https://exemplo.com/portfolio.pdf' },
          profileId: { type: 'integer', example: 1 },
          technologyIds: {
            type: 'array',
            minItems: 1,
            items: { type: 'integer' },
            example: [1, 2]
          }
        }
      },
      Project: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          title: { type: 'string', example: 'Meu Portfólio' },
          description: { type: 'string', example: 'Site com meus projetos' },
          pdfUrl: { type: 'string', example: 'https://exemplo.com/portfolio.pdf' },
          averageRating: { type: 'number', example: 4 },
          upvotes: { type: 'integer', example: 2 },
          createdAt: { type: 'string', format: 'date-time' },
          profileId: { type: 'integer', example: 1 }
        }
      },
      FeedbackInput: {
        type: 'object',
        required: ['rating', 'comment'],
        properties: {
          rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
          comment: { type: 'string', example: 'Projeto muito bom!' }
        }
      }
    }
  }
};