import { getSuggestedQuery } from '@testing-library/react'
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import useForm from '../../Hooks/useForm'
import { TOKEN_POST, USER_GET } from '../../services/Api'
import Button from '../forms/Button'
import Input from '../forms/Input'
import { GlobalUserContext } from '../UserContext'

export default function LoginForm() {
  const username = useForm()
  const password = useForm()
  const {userLogin} = useContext(GlobalUserContext)
  // const [username, setUsername] = useState()
  // const [password, setPassword] = useState()

  async function handleSummit(e){
    e.preventDefault()
    if(username.validate() && password.validate()){
      userLogin(username.value, password.value)
    }
  }

  return (
    <section>
        <h1>Login</h1>
        <form action='' onSubmit={handleSummit}>
            <Input label="Usuário" type='text' name="username" 
             {...username}
             />
            <Input label="Senha" type='password' name="password" 
             {...password} 
            />
            <Button>Entrar</Button>
        </form>
        <Link to="/login/criar">Cadastro</Link>
    </section>
  )
}
