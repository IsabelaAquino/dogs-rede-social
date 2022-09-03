import React, { createContext, useState, useEffect } from 'react'
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from '../services/Api'

export const GlobalUserContext = createContext()

export const UserStorage = ({children}) => {
  const [data, setData] = useState(null)
  const [login, setLogin] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function autoLogin(){
        const token = localStorage.getItem('token')
        if(token){
            try{
                setError(null)
                setLoading(true)
                const {url, options} = TOKEN_VALIDATE_POST(token)
                const res = await fetch(url, options)
                if(!res.ok) throw new Error('Token inválido')
                await getUser(token)

            }catch(err){
                userLogout()
            } finally{
                setLoading(false)
            }
        }
    }
    autoLogin()
  }, [])
  

  async function getUser(token){
    const {url, options} = USER_GET(token)
    const res = await fetch(url, options)
    const json = await res.json()
    setData(json)
    setLogin(true)
  }

  async function userLogin(username, password){
    try{
        setError(null)
        setLoading(true)
        const {url, options} = TOKEN_POST({username: username, password: password})
        const tokenRes = await fetch(url, options)
        if(!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`)
        const {token} = await tokenRes.json()
        localStorage.setItem('token', token)
        await getUser(token)
    }catch(err){
        setError(err.message)
        setLogin(false)
    }finally{
        setLoading(false)
    }
  }

  async function userLogout(){
    setData(null)
    setError(null)
    setLoading(false)
    setLogin(false)
    localStorage.removeItem('token')
  }

  return (
    <GlobalUserContext.Provider value={{usuario: 'isa', userLogin, data, userLogout}}>
      {children}
    </GlobalUserContext.Provider>
  )
}

