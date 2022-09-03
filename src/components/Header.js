

import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import style from './Header.module.css'
import { ReactComponent as Dogs } from '../assets/dogs.svg'
import { GlobalUserContext } from './UserContext'

export default function Header() {
  const {data, userLogout} = useContext(GlobalUserContext)

  return (
    <header>
      <nav className={`${style.logo} container`}>
        <Link className={style.logo} to="/" aria-label='Dogs - Home'>
            <Dogs />
        </Link>
        {data ? <>
          <Link className={style.login} to="/conta">{data.nome}</Link> 
          <button onClick={userLogout}>Sair</button>
        </>:
          <Link className={style.login} to="/login">Login / Criar</Link> }
      </nav>
    </header>
  )
}
