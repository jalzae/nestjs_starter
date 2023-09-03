export class user {
  init() {
    return {
      id: {
        type: 'uuid',
        datatype: 'enc'
      },
      name: {
        type: 'string',
        required: 'required',
        valid: [{ type: 'min', value: 5 }]
      },
      email: {
        type: 'email',
        required: 'required',
        datatype: 'string'
      },
      photo: {
        type: 'string',
        datatype: 'string'
      }
    }
  }

  setup(): { paranoid: boolean; delete: string; table: string } {
    return {
      paranoid: true,
      delete: 'deletedAt',
      table: 'user'
    }
  }
}