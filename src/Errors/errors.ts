export class NotImplementedError extends Error {
    constructor() {
        super("Not implemented"); 
    }
}

export class GeneralError extends Error {

    private data: unknown; 

    constructor(message:string, data: unknown) {
        super(message); 
        this.data = data; 
    }
}