import React from "react";
import { nanoid } from 'nanoid'
import { getDatabase, child, red, set, get } from 'firebase/database'
import {isWebUrl} from 'valid-url'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'

function Form() {
    const [formData, setFormData] = useState({
        longURL:'',
        preferedAlias:'',
        generatedURL:'',
        loading:false,
        errors:[],
        errorMessage:{},
        toolTipMessage:'Copy to Clip Board'
    })

    return(
        <>

        </>
    )
}

export default Form