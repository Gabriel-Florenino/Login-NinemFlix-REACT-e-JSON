import {useState, useEffect} from "react" 
import './MainLoginAndCadastro.css'

const MainLoginAndCadastro = () => {
    const [cadastro, setCadastro]  = useState()
    const [loading, setLoading]  = useState()
    let handlerClick = (e) => {
        e.preventDefault()
        setCadastro(!cadastro)
    }
    let handlerSubmit = (e) => {
        e.preventDefault()
        if (cadastro) {
            setCadastro(!cadastro)
        }
    }

    return(
        <>
            <main>
                <form onSubmit={handlerSubmit} className="form-login-and-cadastro">
                    {(!cadastro) ? <h1 className="title-form-login-and-cadastro">Entrar</h1> : 
                    <h1 className="title-form-login-and-cadastro">Cadastre-se</h1>}
                    {(cadastro) &&
                        <>
                        <div className="box-of-inputs-form-login-and-cadastro">
                            <input className="input" type="text" required/>
                            <span className="placeholder">Nome</span>   
                        </div>
                        <div className="box-of-inputs-form-login-and-cadastro">
                            <input className="input" type="text" required/>
                            <span className="placeholder">Idade</span>
                            <p>Idade invalida</p>
                        </div>
                        </>
                    }
                    <div className="box-of-inputs-form-login-and-cadastro">
                        <input className="input" type="text" required/>
                        <span className="placeholder">Email</span>
                        <p>Informe um email valido</p>
                    </div>
                    <div className="box-of-inputs-form-login-and-cadastro">
                        <section className="sec-password-form-login-and-cadastro">
                            <input className="input" type="text" required/>
                            <span className="placeholder">Senha</span>
                            <span id="btn-hide-or-show">OCULTAR</span>
                        </section>
                        <p>Senha invalida</p>
                    </div>
                    <button className="button-submit-form-login-and-cadastro" type="submit" >Entrar</button>
                    <section className="sec-help-and-checkbox-form-login-and-cadastro">
                        {(!cadastro) &&  
                            <section>
                                <input type="checkbox" defaultChecked/>
                                <p>Lembre-se de mim</p>
                            </section>
                        }
                        <p><a href="">Precisa de ajuda?</a></p>
                    </section>
                    {(!cadastro) ? <h3>Novo por aqui? <a onClick={handlerClick}>Assine agora!</a></h3> 
                    : <h3>Ja teve aqui antes <a onClick={handlerClick}>Login!</a></h3>}
                    <p>Esta página é protegida pelo google reCAPTCHA 
                    para garantir que você não é um robo. <a href="#">Saiba mais</a></p>
                </form>
            </main>
        </>
    )
}
export default MainLoginAndCadastro;