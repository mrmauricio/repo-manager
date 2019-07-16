/* Container components - grants reusability (used both on Main.js and Repository.js) */

import styled from 'styled-components';

const Container = styled.div`
    max-width: 700px; /* largura maxima */
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    margin: 80px auto;

    h1 {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        align-items: center; /* garante que fiquem alinhados horizontalmente */

        svg {
            margin-right: 10px;
        }
    }
`;

export default Container;
