import styled from 'styled-components';

export const StyledApp = styled.div`
    position: fixed; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0; 

    display: flex; 
    flex-flow: column nowrap; 

    main {
        border: solid 1px red; 
        flex: 1 1 auto; 

        /* Helpful for seeing if it is overflowing */
        overflow: auto;
    }
`;
