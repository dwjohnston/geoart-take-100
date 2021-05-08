import React from 'react';
import styled from "styled-components";
export type ComponentContainerProps = {

}

const StyledComponentContainer = styled.div`
    border: dashed 1px black; 
`;

export const ComponentContainer = (props: React.PropsWithChildren<ComponentContainerProps>) => {
    const { children } = props;
    return <StyledComponentContainer>{children} </StyledComponentContainer>;
};
