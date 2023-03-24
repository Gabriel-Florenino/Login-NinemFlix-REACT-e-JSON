import './FooterLoginAndCadastro.css'
const FooterLoginAndCadastro = () => {
    return(
        <>
            <footer className="footer-login-cadastro">
                <section className="container-footer-login-cadastro">
                    <h3 className="title-footer-login-cadastro">Dúvidas? Ligue +55 47 996241250</h3>
                    <ul>
                        <li><a href="#">Perguntas frequentes</a></li>
                        <li><a href="#">Termos de uso</a></li>
                        <li><a href="#">Preferência de cookies</a></li>
                    </ul>
                    <ul>
                        <li><a href="#">Central de ajuda</a></li>
                        <li><a href="#">Privacidade</a></li>
                        <li><a href="#">Informações Corporativas</a></li>
                    </ul>
                </section>
            </footer>
        </>
    )
}
export default FooterLoginAndCadastro;