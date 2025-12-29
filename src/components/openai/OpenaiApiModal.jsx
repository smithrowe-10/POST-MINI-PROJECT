import { sentTextOpenai } from "../../apis/openai/openaiApi";
import { useState } from "react";

function OpenaiApiModal() {

    const [ inputValue, setInputValue ] = useState("");

    const handleSend = async () => {
        const response = await sentTextOpenai(inputValue);
        console.log(response.output_text);
    }

    return <div>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
        <button onClick={handleSend}>전송</button>
    </div>
}

export default OpenaiApiModal;