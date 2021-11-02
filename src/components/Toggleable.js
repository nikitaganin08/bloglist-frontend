import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Toggleable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <p/>
            <div style={hideWhenVisible}>
                <Button variant="primary" type="submit" onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button variant="secondary" type="submit" onClick={toggleVisibility}>
                    cancel
                </Button>
            </div>
        </div>
    )
})

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

Toggleable.displayName = 'Toggleable'

export default Toggleable