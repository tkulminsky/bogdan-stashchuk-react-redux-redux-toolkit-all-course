function ResetButton(props) {
  const {onClick} = props
  const buttonStyle = {backgroundColor: 'lightgreen'}
  return (
    <div>
      <button style={buttonStyle} onClick={onClick}>
        Reset{' '}
      </button>
    </div>
  )
}

export default ResetButton
