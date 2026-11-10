"use client";

import { useEffect, useState } from "react";
import { getErrorMessage } from "@/src/lib/api";
import { listAvailableLessons } from "@/src/services/aula";
import { logout } from "@/src/services/auth";
import { useRouter } from "next/navigation";

type AvailableLesson = {
    id: string;
    titulo: string;
    descricao: string;
    conteudo: string;
    professor: {
        nome: string;
    };
};

export default function StudentHomePage() {
    const router = useRouter();
    const [aulas, setAulas] = useState<AvailableLesson[]>([]);
    const [error, setError] = useState("");
    const [loggingOut, setLoggingOut] = useState(false);

    useEffect(() => {
        listAvailableLessons()
            .then(setAulas)
            .catch((requestError) => setError(getErrorMessage(requestError)));
    }, []);

    async function handleLogout() {
        setLoggingOut(true);
        try {
            await logout();
            router.replace("/login");
        } finally {
            setLoggingOut(false);
        }
    }

    return (
        <main className="min-h-screen bg-[#100324] px-5 py-8 text-white md:px-12 md:py-12">
            <div className="mx-auto max-w-6xl">
                <header className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-start">
                    <div>
                        <p className="mb-2 text-sm font-normal text-[#aa8fc5]">Área do aluno</p>
                        <h1 className="text-3xl font-bold md:text-4xl">Aulas disponíveis</h1>
                        <p className="mt-3 text-sm font-normal text-[#b9afc5]">
                            Acesse os conteúdos disponibilizados pelos professores.
                        </p>
                    </div>
                    <button
                        className="rounded-xl border border-white/10 px-5 py-3 text-sm text-[#b9afc5] transition-colors hover:bg-white/10 hover:text-white disabled:opacity-60"
                        disabled={loggingOut}
                        onClick={handleLogout}
                        type="button"
                    >
                        {loggingOut ? "Saindo..." : "Sair"}
                    </button>
                </header>

                {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">{error}</p>}
                {!error && aulas.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-[#1a0931] p-8 text-sm font-normal text-[#91849f]">
                        Nenhuma aula disponível no momento.
                    </div>
                )}
                <div className="grid gap-5 md:grid-cols-2">
                    {aulas.map((aula) => (
                        <article className="rounded-2xl border border-white/10 bg-[#1a0931] p-6" key={aula.id}>
                            <p className="mb-2 text-xs font-normal text-[#aa8fc5]">Professor: {aula.professor.nome}</p>
                            <h2 className="text-xl">{aula.titulo}</h2>
                            <p className="mt-3 text-sm font-normal leading-6 text-[#b9afc5]">{aula.descricao}</p>
                            <div className="mt-5 border-t border-white/10 pt-5">
                                <p className="whitespace-pre-wrap text-sm font-normal leading-6 text-[#d0c6d9]">{aula.conteudo}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
