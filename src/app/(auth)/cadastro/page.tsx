'use client';

import { useRouter } from "next/navigation";

export default function CadastroPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#240B48] bg-[url('/image/Background%20Image.png')]  bg-cover bg-center flex flex-col text-left justify-center">
            <h1 className="text-5xl pl-10">Cadastro</h1>
            <form className="flex max-w-md flex-col gap-4 p-10" action="">
                <p className="text-xs">Crie sua conta com o seu e-mail</p>
                <input className="form-input" type="text" placeholder="Nome" />
                <input className="form-input" type="email" placeholder="E-mail" />
                <input className="form-input" type="password" placeholder="Senha" />
                <input className="form-input" type="password" placeholder="Confirme sua senha" />
                <button className="rounded-2xl bg-linear-to-r from-[#501794] to-[#3E70A1] py-2" type="submit">
                    Criar conta
                </button>
                <p className="text-xs" onClick={() => router.back()}>Já tem uma conta? Entrar</p>
            </form>
        </main>
    );
}