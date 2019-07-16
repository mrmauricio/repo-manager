import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    /*  reset global de propriedades */
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    /*  faz com que ocupem 100% da altura, indo até o fim da pagina no browser
        já que no padrão ocupa apenas parte da tela */
    html, body, #root {
        min-height: 100%;
    }

    body {
        background: #7159c1;
        /* deixar resolução da letra melhor */
        -webkit-font-smoothing: antialiased !important;
    }

    body, input, button {
        color: #222;
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
    }

    button {
        cursor: pointer;
    }
`;
