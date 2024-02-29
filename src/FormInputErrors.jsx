import PropTypes from "prop-types"

function FormInputErrors(props) {
    return (
        <div>
            {props.errors.map((error, index) => (
                <label key={index} className="error">
                    {error}
                </label>
            ))}
        </div>
    )
}

FormInputErrors.propTypes = {
    errors: PropTypes.arrayOf(PropTypes.string)
}

export default FormInputErrors