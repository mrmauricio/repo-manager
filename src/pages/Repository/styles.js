import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    /* from = estado do começo da animação (0), até o to: estado final (360) */
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const Loading = styled.div`
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    svg {
        animation: ${rotate} 2s linear infinite;
    }
`;

export const LoadingIssueList = styled.div`
    color: #7159c1;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        animation: ${rotate} 2s linear infinite;
    }
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            padding-right: 5px;
        }
    }

    a {
        color: #7159c1;
        font-size: 16px;
        text-decoration: none;
    }

    img {
        width: 120px;
        border-radius: 50%;
        margin-top: 20px;
    }

    h1 {
        font-size: 24px;
        margin-top: 10px;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        line-height: 1.4;
        text-align: center;
        max-width: 400px;
    }
`;

export const IssueList = styled.ul`
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
        border: 1px solid #eee;
        border-radius: 4px;

        /* aplica o css em algum elemento que venha depois do elemento atual
        (no caso o &) e que seja li; no caso, todos li menos o primeiro */
        & + li {
            margin-top: 10px;
        }

        img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            border: 2px solid #eee;
        }

        div {
            /* é o flex grow, pra ocupar todo o espaço; assim, caso algum
            titulo seja maior que o espaço disponivel, quebra a linha */
            flex: 1;
            margin-left: 15px;

            strong {
                font-size: 16;

                a {
                    text-decoration: none;
                    color: #333;

                    &:hover {
                        color: #7159c1;
                    }
                }

                span {
                    background: #eee;
                    color: #333;
                    border-radius: 2px;
                    font-size: 12px;
                    font-weight: 600;
                    height: 20px;
                    padding: 3px 4px;
                    margin-left: 10px;
                    margin-top: 5px;
                    line-height: 2;
                }
            }

            p {
                margin-top: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
        background: white;
        height: 24px;
        width: 75px;
        font-weight: bold;
        font-size: 12px;
        color: #7159c1;
        border: 1px solid #7159c1;
        border-radius: 16px;
        margin-top: 30px;

        &[disabled] {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }

    span {
        margin-top: 30px;
        font-size: 12px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 30px;
    /* esses tres abaixo é pra fazer aparecer um traço, este estará entre o
    padding e a margin abaixo */
    padding-top: 30px;
    margin-top: 30px;
    border-top: 1px solid #eee;
`;

export const IssueType = styled.button`
    height: 34px;
    background: ${props => (props.active ? '#f4f2fc' : 'white')};
    width: 90px;
    font-weight: bold;
    font-size: 14px;
    color: #7159c1;
    border: 1px solid #7159c1;
    border-radius: 16px;
    margin: 0px 2px;
    text-transform: capitalize;
`;
