/** @jsxImportSource @emotion/react */
// https://www.npmjs.com/package/react-modal
import ReactModal from "react-modal";
import  * as s  from "./styles";
import Loading from "../common/Loading";
import { useMeQuery } from "../../queries/usersQueries";
import Select from "react-select";
import { IoCloudUploadOutline } from "react-icons/io5";

// - isOpen: 모달을 열지 말지 결정하는 True/False 값
// - onRequestClose: 모달 바깥을 누르거나 ESC를 누를 때 실행될 닫기 함수
// - layoutRef: 모달이 어디를 기준으로 뜰지 지정하는 참조점(보통 MainLayout)
function AddPostModal({isOpen, onRequestClose, layoutRef}) {

    const {isLoading, data} = useMeQuery();

    if (isLoading) {
        return <Loading/>
    }

    return <ReactModal 
        style={{
            overlay: {
                position: "absolute",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#00000055"
            },
            content: {
                position: "static",
                boxShadow: "0 0 10px 5px #00000033",
                padding: "0",
            }
        }}
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        // [중요] 모달이 렌더링될 '부모 태그'를 layoutRef가 가리키는 곳으로 지정
        // 이렇게 하면 화면 전체가 아니라 Layout 영역 안에서만 모달이 보임
        parentSelector={() => layoutRef.current}
        appElement={layoutRef.current}
        ariaHideApp={false}>
            <div css={s.modalLayout}>
                <header>
                    <h2>Add a Post</h2>
                </header>
                <main>
                    <div css={s.profileContainer}>
                        <div css={s.profileImg(data.data.imgUrl)}></div>
                        <div>{data.data.nickname}</div>
                    </div>
                    <Select
                        options={[
                            {
                            label: "Public",
                            value: "Public"
                            },
                            {
                            label: "Follow",
                            value: "Follow"
                            },
                    ]} />
                    <div css={s.contentInputBox}>
                        <textarea></textarea>
                    </div>
                    <div>
                        <IoCloudUploadOutline />
                        <div>Please post your story.</div>
                        <button>Add Image</button>
                    </div>
                    <div></div>
                </main>
                <footer>
                    <button css={s.postButton}>Post</button>
                    <button onClick={onRequestClose}>Cancle</button>
                </footer>
            </div>
    </ReactModal>

}

export default AddPostModal;