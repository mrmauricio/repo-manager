import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row; /* garantir que o input e o botao fiquem ao lado
    não importando qual seja o tamanho */

    input {
        flex: 1; /* (flex-grow) faz estender para o tamanho maximo disponivel */
        border: 1px solid ${props => (props.error ? '#e00' : '#eee')};
        padding: 10px 15px;
        border-radius: 4px;
        font-size: 16px;
    }
`;

const rotate = keyframes`
    /* from = estado do começo da animação (0), até o to: estado final (360) */
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button.attrs(props => ({
    /* é possível passar atributos pelo styled components;
    esse atributo 'submit' seria passado pelo html, é pra indicar que o botao
    faz o submit do form */
    type: 'submit',
    // quando o loading do props for true, ativará o atributo disabled
    disabled: props.loading,
}))`
    background: #7159c1;
    border: 0;
    padding: 0 15px;
    margin-left: 10px;
    border-radius: 4px;

    /* garante que o conteudo do botao esteja centralizado */
    display: flex;
    justify-content: center;
    align-items: center;

    /* isso só será aplicado quando disabled for true */
    &[disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    /*  isso só acontece caso loading seja true */
    /*  a prop css serve para acidionar css para um elemento baseado em uma
        informação que vem de fora */
    ${props =>
        props.loading &&
        css`
            svg {
                animation: ${rotate} 2s linear infinite;
            }
        `}
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li {
        padding: 15px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        /* aplica o css em algum elemento que venha depois do elemento atual
        (no caso o &) e que seja li; no caso, todos li menos o primeiro */
        & + li {
            border-top: 1px solid #eee;
        }

        div {
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                padding-top: 2px;
                margin-right: 10px;
                color: #7159c1;
                cursor: pointer;
            }
        }
    }

    a {
        color: #7159c1;
        text-decoration: none;
    }
`;

export const ErrorMessage = styled.span`
    font-size: 12px;
    margin-left: 5px;
    color: #e00;
`;

export const EmptyList = styled.h3`
    font-weight: normal;
    font-size: 15px;
    margin: 30px 0px;

    display: flex;
    justify-content: center;
    align-items: center;

    button {
        color: #7159c1;
        cursor: pointer;
        background: white;
        border: 0;
    }
`;
