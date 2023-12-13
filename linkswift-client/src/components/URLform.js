import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid'
import { getDatabase, child, ref, set, get } from 'firebase/database'
import { isWebUri } from 'valid-url'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ToolTip from 'react-bootstrap/Tooltip'

function Form(props) {
    const [formData, setFormData] = useState({
        longURL: '', //Inputted long url from the user
        preferedAlias: '', //Optional user input
        generatedURL: '', //Uses either the optional input or a random short url generated by the app
        loading: false, //Shows spinng logo
        errors: [], //Keeps track of which fields on our form have errors
        errorMessage: {}, //Keeps track of the corresponding message for each error
        toolTipMessage: 'Copy to Clip Board', //Will be updated as the user copies short url
    })
    const hasError = (key) => {
        return formData.errors.indexOf(key) !== -1
    }

    useEffect(()=>{
        console.log(formData.errors.indexOf("longURL"))
    },[formData,setFormData])


    async function onSubmit(event) {
        event.preventDefault(); //Prevents the page from reloading.D
        setFormData({
            ...formData,
            loading: true,
            generatedURL: '',
        })


        // Validate the inputted long url
        const isFormValid = await validateInput();
        if (!isFormValid) {
            return;
        }


        // If the user inputted a preferred alias, we use it
        // If not, we generate one. 
        var generatedKey = nanoid(6) // Six characters long
        var generatedURL = "linkswift.com/" + generatedKey

        if (formData.preferedAlias !== '') {
            generatedKey = formData.preferedAlias
            generatedURL = "linkswift.com/" + generatedKey
        }

        const db = getDatabase();
        set(ref(db, '/' + generatedKey), {
            generatedKey: generatedKey,
            longURL: formData.longURL,
            preferedAlias: formData.preferedAlias,
            generatedURL: generatedURL
        }).then((result) => {
            setFormData({
                ...formData,
                errors:[],// I should probably reset error messages too?
                generatedURL: generatedURL,
                loading: false
            })
        }).catch((e) => {
            //Handle errors
        })

    }


    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData({
            ...formData,
            [id]: value
        })
    }

    const validateInput = async () => {
        var errors = []
        var errorMessages = formData.errorMessage

        //Validate long url
        if (formData.longURL.length === 0) {
            errors.push("longURL")
            errorMessages['longURL'] = "Please enter a URL."
        } else if (formData.longURL.length<=12) {
            errors.push("longURL")
            errorMessages["longURL"] = "This URL is too short to shorten further."
        } else if (!isWebUri(formData.longURL)) {
            errors.push("longURL")
            errorMessages["longURL"] = "Please enter a URL in the form of https://www......"
        }

        //Validate preferred alias
        if (formData.preferedAlias !== '') {
            if (formData.preferedAlias.length > 7) {
                errors.push('suggestedAlias')
                errorMessages['suggestedAlias'] = 'Please enter an Alias less than 7 characters.'
            } else if (formData.preferedAlias.indexOf(' ') >= 0) {
                errors.push('suggestedAlias')
                errorMessages['suggestedAlias'] = 'No Spaces allowed. Please enter one witout space.'
            }

            var keyExists = await checkKeyExists()

            if (keyExists.exists()) {
                errors.push('suggestedAlias')
                errorMessages['suggestedAlias'] = 'The Alias you have enter already exists. Pleae enter a different one.'
            }
        }
        setFormData({
            ...formData,
            errors: errors,
            errorMessages: errorMessages,
            loading: false
        })

        if (errors.length > 0) {
            return false
        }

        return true
    }

    const checkKeyExists = async () => { // Will be used inside validate url function
        const dbRef = ref(getDatabase())
        return get(child(dbRef, `/${formData.preferedAlias}`)).catch((error) => {
            return false
        })
    }

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(formData.generatedURL)
        setFormData({
            ...formData,
            toolTipMessage: 'Copied'
        })
    }

    return (
        <>
            <div className="container">
                <form autoComplete="off">
                    <h3>Link Swift</h3>

                    <div className="form-group">
                        <label>Enter your URL</label>
                        <input id="longURL"
                            onChange={handleChange}
                            value={formData.longURL}
                            type="url"
                            required
                            className={
                                hasError("longURL")
                                    ? "form-control is-invalid"
                                    : "form-control"
                            }
                            placeholder="https://www." />
                    </div>

                    <div className={ // Will stay visually hidden until an error from inputted URL 
                        hasError("longURL") ? "text-danger" : "visually-hidden"
                    }
                    >
                        {formData.errorMessage.longURL}
                    </div>

                    <div className="form-group">
                        <label htmlFor="basic-url">Your Mini URL</label>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">linkswift.com/</span>
                            </div>
                            <input
                                id="preferedAlias"
                                onChange={handleChange}
                                value={formData.preferedAlias}
                                type="text"
                                className={
                                    hasError('preferedAlias')
                                        ? "form-control is-invalid"
                                        : "form-control"
                                }
                                placeholder="eg. w4guy6 (Optional)"
                            />
                        </div>
                    </div>

                    <div className={ // Will stay hidden until error from inputted short URL
                        hasError("suggestedAlias") ? "text-danger" : "visually-hidden"}>
                        {formData.errorMessage.suggestedAlias}
                    </div>

                    <button className="btn btn-primary" type="button" onClick={onSubmit}>
                        {
                            formData.loading ?
                                <div>
                                    <span
                                        className="spinner-border spinnder-border-sm"
                                        role="status"
                                        aria-hidden='true' />
                                </div> :
                                <div>
                                    <span
                                        className="visually-hidden spinner-border spinnder-border-sm"
                                        role="status"
                                        aria-hidden='true' />
                                    <span>Link Swift</span>
                                </div>
                        }
                    </button>

                    { // Will render when the generated url is created
                        formData.generatedURL === '' ?
                            <div></div>
                            :
                            <div className="generatedurl">
                                <span>Your generated URL is: </span>
                                <div className="input-group-mb3">
                                    <input
                                        disabled type="text"
                                        value={formData.generatedURL}
                                        className="form-control"
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <OverlayTrigger
                                            key={'top'}
                                            placement={'top'}
                                            overlay={
                                                <ToolTip id={`tooltip-${'top'}`}>
                                                    {formData.toolTipMessage}
                                                </ToolTip>
                                            }
                                        >
                                            <button
                                                onClick={() => copyToClipBoard()}
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Tooltip on top"
                                                className="btn btn-outline-secondary"
                                                type="button">Copy</button>
                                        </OverlayTrigger>
                                    </div>
                                </div>
                            </div>
                    }

                </form>
            </div>
        </>
    )

}

export default Form