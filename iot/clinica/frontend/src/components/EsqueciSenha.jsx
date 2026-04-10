import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

const EsqueciSenha = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        cpf: "",
        senha_nova: "",
        confirmar_senha: ""
    })

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            
                alert("Senha alterada com sucesso.")

           
            navigate("/login");
        } catch (error) {
            console.log("Erro ao trocar de senha.", error);
        }
    }

  return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4">

            <div className="card shadow">
                <div className="card-header bg-warning text-dark">
                Alterar Senha
                </div>

                <div className="card-body">

                <form onSubmit={handleChangePassword}>

                    <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">
                        cpf
                    </label>
                    <input
                        type="cpf"
                        className="form-control"
                        placeholder="Digite o seu cpf"
                        name="cpf"
                        id="cpf"
                        value={form.cpf}
                        onChange={(e) =>
                        setForm({ ...form, cpf: e.target.value })
                        }
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="senha_nova" className="form-label">
                        Nova senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nova senha"
                        name="senha_nova"
                        id="senha_nova"
                        value={form.senha_nova}
                        onChange={(e) =>
                        setForm({ ...form, senha_nova: e.target.value })
                        }
                    />
                    </div>

                    <div className="mb-3">
                    <label htmlFor="confirmar_senha" className="form-label">
                        Confirmar senha
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirmar senha"
                        name="confirmar_senha"
                        id="confirmar_senha"
                        value={form.confirmar_senha}
                        onChange={(e) =>
                        setForm({ ...form, confirmar_senha: e.target.value })
                        }
                    />
                    </div>

                    <button type="submit" className="btn btn-warning w-100">
                    Trocar senha
                    </button>

                </form>

                </div>
            </div>

            </div>
        </div>
        </div>
  )
}

export default EsqueciSenha;