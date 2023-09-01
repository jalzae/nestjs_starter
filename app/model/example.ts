class Example {

  init() {
    return {
      id: {
        type: 'id',
      },
      name: {
        type: 'decimal',
        default: 0,
      }
    }
  }

  setup(paranoid: boolean = true) {
    return {
      paranoid,
      table: 'example'
    }
  }
}