'use client';

import { registerStudent } from "@/src/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {
    const router = useRouter();
    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    const [confirmeSenha, setConfirmesenha] = useState<string>('')


    function validaDados(): boolean {
        if (!nome) {
            alert("O nome é necessario");
            return false;
        }

        if (!email) {
            alert("O email é necessario");
            return false
        }

        if (!senha) {
            alert("A senha é necessaria");
            return false;
        }

        if (!confirmeSenha) {
            alert("A confirmação de senha é necessaria")
            return false;
        }

        if(!(confirmeSenha===senha)) {
            alert("As senhas não são iguais")
            return false
        }

        return true;
    }


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!validaDados()) {
            return;
        }

        const nomeNormalizado = nome.trim();
        const emailNormalizado = email.trim();
        const senhaNormalizado = senha.trim();
        const confirmeSenhaNormalizado = confirmeSenha.trim();

        await registerStudent({
            nome: nomeNormalizado,
            email: emailNormalizado,
            senha: senhaNormalizado,
            confirmeSenha: confirmeSenhaNormalizado
        })

        alert('Criado com sucesso!')
        router.push('/login')

    }

    return (
        <main className="min-h-screen bg-[#160430] bg-[url('/image/Background%20Image.png')] md:bg-none bg-cover bg-center flex flex-col text-left justify-center md:flex-row md:justify-center md:text-center">
            <img className="hidden md:block md:h-screen md:w-1/2 object-cover object-left" src="/image/Background-desketop.png" alt="" />
            <div className="m-10 md:m-0 md:flex md:w-1/2 md:flex-col md:justify-center md:px-10">
                <h1 className="text-5xl pb-6">Cadastro</h1>
                <form className="flex flex-col gap-4 md:items-center md:mx-15" onSubmit={handleSubmit}>
                    <p className="text-xs">Crie sua conta com o seu e-mail</p>
                    <input className="form-input" type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
                    <input className="form-input" type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
                    <input className="form-input" type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
                    <input className="form-input" type="password" placeholder="Confirme sua senha" onChange={(e) => setConfirmesenha(e.target.value)}/>
                    <button className="w-full rounded-2xl bg-linear-to-r from-[#501794] to-[#3E70A1] py-5" type="submit">
                        Criar conta
                    </button>
                    <p className="text-xs" onClick={() => router.back()}>
                        Já tem uma conta? <span className="cursor-pointer text-[#9D5CE9]">Entrar</span>
                    </p>
                </form>
            </div>
        </main>
    );
}