import styled from 'styled-components';

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 1024px) {
        margin: 0 220px;
    }
    .title {
        text-align: center;
        font-size: 3em;
        font-weight: 600;
        margin: 0;
    }

    .content-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }
`;

export default StyledWrapper;