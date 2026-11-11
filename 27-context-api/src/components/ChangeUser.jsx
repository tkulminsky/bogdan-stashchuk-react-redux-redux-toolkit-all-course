import UserContext from '../context/UserContext'
import {useContext, useState} from 'react'

function ChangeUser() {
  const {userName, changeUserName} = useContext(UserContext)

  const [inputValue, setInputValue] = useState(userName)

  const handleSubmit = (e) => {
    e.preventDefault()
    return inputValue.trim()
      ? changeUserName(inputValue.trim())
      : changeUserName('Введите корректное имя пользователя')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите новое имя"
      />
      <button
        type="submit"
        // onClick={() => changeUserName(userName === 'Timur' ? 'Alice' : 'Timur')}
      >
        Change user
      </button>
    </form>
  )
}

export default ChangeUser
