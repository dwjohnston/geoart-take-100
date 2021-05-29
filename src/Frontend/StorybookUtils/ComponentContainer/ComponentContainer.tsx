import React, { ClassAttributes, CSSProperties } from 'react';
import styled from "styled-components";
export type ComponentContainerProps = {
    height? : number; 
    width?:  number; 
    style?: CSSProperties; 
}

const StyledComponentContainer = styled(({height, width, style,  ...rest}) => <div style = {style} {...rest}/> )`
    border: dashed 1px black;  
    height: ${(props) => props.height ? props.height + 'px' : 'auto'};
    width: ${(props) => props.width ? props.width + 'px' : 'auto'};  
`;

export const ComponentContainer = (props: React.PropsWithChildren<ComponentContainerProps>) => {
    const { children, ...rest  } = props;
    return <>


    <StyledComponentContainer {...rest}>{children} </StyledComponentContainer></>;
};
