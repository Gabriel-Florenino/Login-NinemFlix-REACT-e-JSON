import {useState, useEffect} from "react" 
import './MainLoginAndCadastro.css'
const API = 'http://localhost:5000/'

const MainLoginAndCadastro = () => {
    //HIDE or SHOW password button
    const [controlVisibleOrInvisible, setControlVisibleOrInvisible]  = useState('text')
    const [controlVisibleOrInvisibleText, setControlVisibleOrInvisibleText]  = useState('OCULTAR')
    //Data birth input animation
    let [ageDate, setAgeDate]  = useState('text')
    //Variables for errors
    const [erroTextPassword, setErroTextPassword]  = useState('')//Erros passsword
    const [erroInputPassword, setErroInputPassword]  = useState('')//Erros passsword
    const [erroTextAge, setErroTextAge]  = useState('')//Erros age
    const [erroInputAge, setErroInputAge]  = useState('')//Erros age
    const [erroTextEmail, setErroTextEmail]  = useState('')//Erros email
    const [erroInputEmail, setErroInputEmail]  = useState('')//Erros email
    //Change of login for cadastro
    const [cadastro, setCadastro]  = useState()
    //Insert proprietes in the person object
    const [name, setName]  = useState("")
    const [age, setAge]  = useState('')
    const [email, setEmail]  = useState("")
    const [password, setPassword]  = useState("")
    // Loading fetched data
    const [loading, setLoading]  = useState()
    // Object return in the backend
    const [resPerson, setResPerson]  = useState([])
    // Check if the user was registered
    const [userExistsText, setUserExistsText]  = useState('')
    let [userExists, setUserExists] = useState()
    /*-----------------------------------------------
    -----------------------------------------------*/
    // Function for change of login for cadastro
    const handlerClick = (e) => {
        e.preventDefault()
        // Reset erros
        hideOrShowErrors('hide', 'email')
        hideOrShowErrors('hide', 'password')
        hideOrShowErrors('hide', 'age')
        setCadastro(!cadastro)
    }
    //Verify if is all okay with the email informed
    const emailIsValid = (email) => { 
        let user = email.substr(0, email.indexOf("@"));
        let domain = email.substr(email.indexOf("@")+ 1, email.length);
        if ((user.length >=1) && (domain.length >=3) && (user.search("@")==-1) && (domain.search("@")==-1) 
        && (user.search(" ")==-1) && (domain.search(" ")==-1) && (domain.search(".")!=-1) 
        && (domain.indexOf(".") >=1)&& (domain.lastIndexOf(".") < domain.length - 1)) {
            return true;
        }else{return false;}
    }
    //verify if is all okay with the password informed
    const passwordIsValid = (password) => {
        let verificaEspaco = /\s/g. test(password);
        if (password.length >= 4 && password.length <= 8 && verificaEspaco == false) {
            return true;
        }else{return false;}
    }
    //verify if is all okay with birth date informed
    const ageIsValid = (date) => { 
        const data = new Date();
        let day = data.getDate()
        let month = data.getMonth() + 1
        let year = data.getFullYear()
        if ((year - (date.substring(0, 4)) > 18) || 
        ((year - (date.substring(0, 4)) == 18) && (month > (date.substring(5,7)))) 
        || ((year - (date.substring(0, 4)) == 18) && (month == (date.substring(5,7))) 
        && (day >= (date.substring(8, 10))))){
            return true
        }else{return false}
    }
    //Show or hide the error
    const hideOrShowErrors = (hideOrShow, element) => {
        if (hideOrShow == 'show') {
            if (element == 'email') {
                setErroTextEmail('erro-text')      
                setErroInputEmail('erro-input')
            }else if (element == 'password'){
                setErroTextPassword('erro-text')      
                setErroInputPassword('erro-input')
            }else{
                setErroTextAge('erro-text')      
                setErroInputAge('erro-input')
            }
        }else{
            if (element == 'email') {
                setErroTextEmail('')      
                setErroInputEmail('')
            }else if (element == 'password'){
                setErroTextPassword('')      
                setErroInputPassword('')
            }else{
                setErroTextAge('')      
                setErroInputAge('')
            }  
        }
    }
    //Call API for fetch an answer
    useEffect(() => {
        const loadData = async () => {
        setLoading(true)
        const res = await fetch(API + 'ninemflixDb')
        .then((res)=> res.json())
        .then((data)=> data)
        .catch((err)=>console.log(err))
        setLoading(false)
        setResPerson(res)
        };
    loadData()
    },[]);
    //Creating user for insert in the backend
    let person = {
        name: name,
        age: age,
        email: email,
        password: password
    }
    //Go through all array for to verify if user exists
    console.log('--------------------------------')
    console.log('renderizou')
    console.log('--------------------------------')
    const returnUserExist = () => {
        for (let i = 0; i < resPerson.length; i++) {
            let element = resPerson[i];
            console.log(email)
            console.log(element.email)
            if( element.email == email) {
                setUserExists(true);
                return;
            }            
        }
        setUserExists (false)
    }
    //Principal function (submit in the form cadastro)
    const handlerSubmit = async (e) => {
        e.preventDefault(); //Removing event default
        if (emailIsValid(person.email)) {
            hideOrShowErrors('hide', 'email')
            if (passwordIsValid(person.password)) {
                hideOrShowErrors('hide', 'password')
                returnUserExist()
                if (cadastro) {
                    setUserExistsText('')
                    if (ageIsValid(person.age)) {
                        hideOrShowErrors('hide', 'age')
                        if (userExists) {//Verify if user exists
                            setUserExistsText("Email ja cadastrado") 
                            hideOrShowErrors('show', 'email')
                            return;
                        }else{ //Verify if user not exists
                            //Send for backend //Call API for send a object (person)
                            await fetch(API + 'ninemflixDb',{
                                method: "post",
                                body: JSON.stringify(person),
                                headers:{
                                    "Content-type" : "application/json",
                                },
                            }) 
                            setUserExistsText("") 
                            // Reset variables in the person
                            setName('')
                            setAge('')
                            setEmail('') 
                            setPassword('')
                            // Reset error
                            setCadastro(!cadastro)//Change for page login 
                            return;
                        }
                    }else{ //Verify if birth date not valid
                        hideOrShowErrors('show', 'age') //Show error age
                    }
                }else{
                    if (userExists) {
                        console.log('entrooo1111111')
                        setUserExistsText('')
                        hideOrShowErrors('hide', 'email')
                        return;
                    }else{
                        setUserExistsText('Este usuário ainda não foi cadastrado, por favor cadastre-se')
                        hideOrShowErrors('show', 'email')
                        console.log('entrooo')
                        console.log('entrooo')
                        return;
                    }
                }
            }else{ //Verify if password not valid
                hideOrShowErrors('show', 'password') //Show error password        
            }
        } else{ //Verify if email not valid
            hideOrShowErrors('show', 'email') //Show error email
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
                            <input value={name || ""} onChange = {(e) => setName(e.target.value)} 
                            className="input input-name" type="text" required/>
                            <span className="placeholder">Nome</span>   
                        </div>
                        <div className="box-of-inputs-form-login-and-cadastro">
                            <input value={age || ""} onChange = {(e) => setAge(e.target.value)} 
                            className="input input-age" type={ageDate} required id={erroInputAge} 
                            onFocus={()=>{setAgeDate('date')}}/>
                            <span className="placeholder">Data de nascimento</span>
                            <p id={erroTextAge}>Idade invalida</p>
                        </div>
                        </>
                    }
                    <div className="box-of-inputs-form-login-and-cadastro">
                        <input value={email || ""} onChange = {(e) => setEmail(e.target.value)} 
                        className="input input-email" type="text" required id={erroInputEmail}/>
                        <span className="placeholder">Email</span>
                        <p id={erroTextEmail}>Informe um email valido. {userExistsText}</p>
                    </div>
                    <div className="box-of-inputs-form-login-and-cadastro">
                        <section className="sec-password-form-login-and-cadastro">
                            <input value={password || ''} onChange = {(e) => setPassword(e.target.value)} 
                            className="input input-password" type={controlVisibleOrInvisible} required id={erroInputPassword}/>
                            <span className="placeholder">Senha</span>
                            <span id="btn-hide-or-show" onClick={() => {
                                if(controlVisibleOrInvisible == 'text') { 
                                    setControlVisibleOrInvisible('password')
                                    setControlVisibleOrInvisibleText("MOSTRAR")
                                }else{
                                    setControlVisibleOrInvisible('text')
                                    setControlVisibleOrInvisibleText("OCULTAR")
                                }}}>{controlVisibleOrInvisibleText}</span>
                        </section>
                        <p id={erroTextPassword}>Senha invalida</p>
                    </div>
                    <button className="button-submit-form-login-and-cadastro" type="submit" onClick={handlerClick}>Entrar</button> 
                    
                    <section className="sec-help-and-checkbox-form-login-and-cadastro">
                        {(!cadastro) &&  
                            <section>
                                <input type="checkbox" defaultChecked/>
                                <p>Lembre-se de mim</p>
                            </section>
                        }
                        <p><a href="">Precisa de ajuda?</a></p>
                    </section>
                    <h3>Novo por aqui? <a onClick={handlerClick}>Assine agora!</a></h3>
                    <p>Esta página é protegida pelo google reCAPTCHA 
                    para garantir que você não é um robo. <a href="#">Saiba mais</a></p>
                </form>
            </main>
        </>
    )
}
export default MainLoginAndCadastro;
