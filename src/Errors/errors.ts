export class NotImplementedError extends Error {
  constructor() {
    super("Not implemented");
  }
}

export class GeneralError extends Error {
  private data: unknown;

  constructor(message: string, data: unknown) {
    super(`${message} 
    data: ${JSON.stringify(data, null, 2)}`);
    this.data = data;
  }

  toString() {
    return this.message + JSON.stringify(this.data, null, 2);
  }
}
