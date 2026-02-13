import style from './style.module.css'

const Login = () =>{

    return (
        <>
            <h1 className={style.title_login}>Login</h1>
            <form action="">
                <label htmlFor="">E-mail</label>
                <input type="text"  id="email"/>
                <br></br>
                <label htmlFor="">Senha</label>
                <input type="text"  id="senha"/>
                <br></br>
                <button>Entrar</button>
            </form>
        </>
    )
}

export default Login