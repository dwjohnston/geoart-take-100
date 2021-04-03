import React, { useEffect, useRef } from "react"; 
import { TheWholeModel } from "../../ModelMapper";


const randInt = () => {
    return Math.floor(Math.random() * 500); 
}


type CanvasProps = {
    model: TheWholeModel; 
}

export const Canvas = (props: CanvasProps) => {


    const {model} = props; 

    const ref = useRef<HTMLCanvasElement>(null); 


    useEffect(() => {


        if (!ref.current) {
            throw new Error ("Canvas doesn't exist");
        }

        const context = ref.current.getContext("2d"); 
        if (!context) {
            throw new Error ("Context doesn't exist");
        }
        const draw = () => {

            const drawables = model.tick();


            drawables.forEach((v) => {
                v.draw({
                    ctx: context
                }); 
            })

            window.requestAnimationFrame(draw);

        }; 

        window.requestAnimationFrame(draw);
    }, []); 

    return <canvas height = "500" width = "500" ref = {ref}/>
}