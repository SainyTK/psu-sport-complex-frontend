import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    width: 100%;
    .ant-select {
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
    }
    .select-month {
        width: 40%;
        max-width: 80px;
    }
`;

export default StyledWrapper;