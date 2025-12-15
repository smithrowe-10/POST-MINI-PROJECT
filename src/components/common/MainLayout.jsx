/** @jsxImportSource @emotion/react */

import  * as s  from "./styles";

function MainLayout(props) {
    console.log(props)
    return <div css={s.layout}>
        <div css={s.frame}>
            <div css={s.frameContainer}>
                {props.children}
            </div>
        </div>
    </div>
}

export default MainLayout;