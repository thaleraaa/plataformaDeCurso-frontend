"use client";

import { useState } from "react";
import ProfessorShell from "@/src/components/ProfessorShell";
import { createAula } from "@/src/services/aula";
import { getErrorMessage } from "@/src/lib/api";

export default function CreateLessonPage() {
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaved(false);
        setError("");
        setLoading(true);
        const form = event.currentTarget;
        const formData = new FormData(event.currentTarget);

        try {
            await createAula({
                titulo: String(formData.get("title") ?? ""),
                descricao: String(formData.get("description") ?? ""),
                conteudo: String(formData.get("content") ?? ""),
            });
            form.reset();
            setSaved(true);
        } catch (requestError) {
            setError(getErrorMessage(requestError));
        } finally {
            setLoading(false);
        }
    }

    return (
        <ProfessorShell>
            <div className="mx-auto max-w-3xl">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-normal text-[#aa8fc5]">Área do professor</p>
                    <h1 className="text-3xl font-bold md:text-4xl">Criar aula</h1>
                    <p className="mt-3 text-sm font-normal text-[#b9afc5]">
                        Preencha as informações abaixo para criar uma nova aula.
                    </p>
                </header>

                <form className="rounded-2xl border border-white/10 bg-[#1a0931] p-6 md:p-8" onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <label className="block">
                            <span className="mb-2 block text-sm">Título da aula</span>
                            <input
                                className="w-full rounded-xl border border-white/10 bg-[#100324] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#9d5ce9]"
                                name="title"
                                placeholder="Ex.: Introdução à engenharia de software"
                                required
                                type="text"
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm">Descrição</span>
                            <textarea
                                className="min-h-36 w-full resize-y rounded-xl border border-white/10 bg-[#100324] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#9d5ce9]"
                                name="description"
                                placeholder="Escreva uma breve descrição sobre o conteúdo da aula"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="mb-2 block text-sm">Conteúdo da aula</span>
                            <textarea
                                className="min-h-48 w-full resize-y rounded-xl border border-white/10 bg-[#100324] px-4 py-3 text-sm font-normal outline-none transition focus:border-[#9d5ce9]"
                                name="content"
                                placeholder="Digite o conteúdo que será apresentado aos alunos"
                                required
                            />
                        </label>
                    </div>

                    <button disabled={loading} className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#8d4ed0] to-[#3e70a1] py-3 text-sm transition-transform hover:scale-[1.01] active:scale-95" type="submit">
                        {loading ? "Criando..." : "Criar aula"}
                    </button>
                    {saved && <p className="mt-4 text-center text-sm font-normal text-[#b995dc]">Aula criada com sucesso!</p>}
                    {error && <p className="mt-4 text-center text-sm font-normal text-red-300">{error}</p>}
                </form>
            </div>
        </ProfessorShell>
    );
}
