export class user {
  init() {
    return {
      id: {
        type: 'uuid',
      },
      name: {
        type: 'string',
        required: 'required',
        valid: [{ type: 'min', value: 5 }]
      },
      email: {
        type: 'email',
        required: 'required'
      },
      photo: {
        type: 'string',
      }
    }
  }

  setup(paranoid: boolean = true) {
    return {
      paranoid,
      table: 'users'
    }
  }
}