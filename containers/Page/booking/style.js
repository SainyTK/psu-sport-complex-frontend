import styled from 'styled-components';

const StyledWrapper = styled.div`
    padding: 16px;
    @media (min-width: 1024px) {
        margin: 0 220px;
    }
    .title {
        font-weight: 400;
    }
    .select-date {
        justify-content: flex-start;
    }
    .select-container {
        justify-content: flex-end;
    }
    .select-container, .select-date {
        display: flex;
        margin: 10px 0;
        @media (max-width: 575px) {
            justify-content: center;
        }
    }
    .link-to-list {
        margin: 10px 0;
        position: relative;
    }
    .btn-container {
        display: flex;
        justify-content: center;
    }
    .input-upload {
        display: none;
    }
`;

export const ConfirmContainer = styled.div`
    input {
        margin-bottom: 10px;
        width: 100%;
    }
`;

export default StyledWrapper;