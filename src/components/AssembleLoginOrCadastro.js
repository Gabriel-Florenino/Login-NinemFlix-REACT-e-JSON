import HeaderLoginAndCadastro from '../components/HeaderLoginAndCadastro';
import FooterLoginAndCadastro from "../components/FooterLoginAndCadastro";
import MainLoginAndCadastro from "../components/MainLoginAndCadastro";

function AssembleLoginOrCadastro() {
    return (
      <>
        <HeaderLoginAndCadastro/>
        <MainLoginAndCadastro/>
        <FooterLoginAndCadastro/>
      </>
    );
  }

  export default AssembleLoginOrCadastro;