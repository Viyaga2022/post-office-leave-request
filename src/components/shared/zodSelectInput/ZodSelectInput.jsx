
const ZodSelectInput = (props) => {
    const { name, className = '', register, defaultValue, options, error } = props

    return (
        <div>
            <select {...register(name)} className={className}>
                <option value="">{defaultValue}</option>
                {options && options.map((item, index) =>
                    <option key={index} value={item.toLowerCase()}>{item}</option>
                )}
            </select>
            {error && (
                <p style={{ paddingTop: '5px', fontWeight: 600, color: 'orange' }}>{error.message}</p>
            )}
        </div>
    )
}

export default ZodSelectInput