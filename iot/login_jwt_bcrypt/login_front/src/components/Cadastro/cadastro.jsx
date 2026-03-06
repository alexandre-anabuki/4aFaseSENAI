import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const cadastro = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    cosnt [confirmaSenha, setConfirmaSenha] = useState('')
    const [senhaMatch, setSenhaMatch] = useState(true)

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleSenhaChange = (e) => setSenha(e.target.value);
    const handleConfirmaSenhaChange = (e) => setConfirmaSenha(e.target.value);

    const senhaValida = () => senha.length >= 6 && senha.length <= 12 && senha === confirmaSenha;

  const handleSubmit = async (e) => {
    e.preventDefault();

        if (!isPasswordValid()) {
        setIsPasswordMatch(false);
        return;
        }
    }
}