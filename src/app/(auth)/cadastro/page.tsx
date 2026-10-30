'use client';

import { useRouter } from "next/navigation";

export default function CadastroPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen bg-[#160430] bg-[url('/image/Background%20Image.png')] md:bg-none bg-cover bg-center flex flex-col text-left justify-center md:flex-row md:justify-center md:text-center">
            <img className="hidden md:block md:h-screen md:w-1/2 object-cover object-left" src="/image/Background-desketop.png" alt="" />
            <div className="m-10 md:m-0 md:flex md:w-1/2 md:flex-col md:justify-center md:px-10">
                <h1 className="text-5xl pb-6">Cadastro</h1>
                <form className="flex flex-col gap-4 md:items-center md:mx-15" action="">
                    <p className="text-xs">Crie sua conta com o seu e-mail</p>
                    <input className="form-input" type="text" placeholder="Nome" />
                    <input className="form-input" type="email" placeholder="E-mail" />
                    <input className="form-input" type="password" placeholder="Senha" />
                    <input className="form-input" type="password" placeholder="Confirme sua senha" />
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