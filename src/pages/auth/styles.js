import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const container = css`
    border-radius: 10px;
    width: 80%;
    height: 80%;
    background-color: #fff;
    box-shadow: 0 0 5px 1px #00000088;
`

export const leftBackground = css`
    flex-grow: 1;
    background-image: url("../../assets/login_bg.jpg")
`

export const rightContainer = css`
    flex-grow: 1;
`