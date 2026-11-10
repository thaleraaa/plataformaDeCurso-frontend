"use client";

import { useRouter } from "next/navigation";
import { login } from "@/src/services/auth";
import { getErrorMessage } from "@/src/lib/api";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const user = await login(email.trim(), senha);
            router.push(user.role === "PROFESSOR" ? "/professor" : "/");
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#160430] bg-[url('/image/Background%20Image.png')] md:bg-none bg-cover bg-center flex flex-col text-left justify-center md:flex-row md:justify-start">
            <img className="hidden md:block md:h-screen md:w-1/2 object-cover object-left" src="/image/Background-desketop.png" alt="" />
            <div className="m-10 md:m-0 md:flex md:w-1/2 md:flex-col md:justify-center md:px-10">
                <h1 className="text-6xl pb-6">Entrar</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <p className="text-xs">Faça login com o seu e-email</p>
                    <input
                        className="form-input"
                        type="email"
                        placeholder="seuemail@exemplo.com "
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Senha"
                        autoComplete="current-password"
                        required
                        value={senha}
                        onChange={(event) => setSenha(event.target.value)}
                    />
                    <button
                        disabled={loading}
                        className="text-lg rounded-2xl bg-linear-to-r from-[#501794] to-[#3E70A1] py-2"
                        type="submit"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                    {error && <p className="text-xs text-red-300">{error}</p>}
                    <p
                        className="text-xs cursor-pointer transition-colors hover:text-purple-300 active:scale-95"
                        onClick={() => router.push("/cadastro")}
                    >
                        NÃO TEM CONTA? CADASTRE-SE
                    </p>
                </form>
            </div>
        </main>
    );
}