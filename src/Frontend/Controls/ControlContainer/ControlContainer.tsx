import React from 'react';
import styled from 'styled-components';

export type ControlContainerProps = {
    
}


export const StyledControlContainer = styled.div`
    border: solid 1px #aaf; 
    padding: 8px; 
    margin: 4px; 

    display: flex; 
    flex-flow: row nowrap;
    justify-content: stretch; 
`;


export const ControlContainer = (props: React.PropsWithChildren<ControlContainerProps>) => {
  const {children} = props;
  return <StyledControlContainer>
      <div>{children}</div>
  </StyledControlContainer>;
};
