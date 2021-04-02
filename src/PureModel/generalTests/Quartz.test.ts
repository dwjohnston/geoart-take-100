import { Quartz } from "../Quartz";
import {ITickable} from "../AbstractModelItem"; 

class TestTickable implements ITickable {

    private _x: number; 

    constructor() {
        this._x = 0; 
    }

    tick() {
        this._x = this._x+1; 
    }

    get x() : number{
        return this._x; 
    }
}

describe ("Quartz", () => {

    it ("Causes a tick on all of its tickables", () => {



        const t1 = new TestTickable();

        const q = new Quartz([
            t1
        ]); 

        expect (t1.x).toBe(0); 

        q.tick(); 
        expect (t1.x).toBe(1);

        q.tick();

        expect(t1.x).toBe(2);


    }); 
}); 