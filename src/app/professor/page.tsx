import Link from "next/link";
import ProfessorShell from "@/src/components/ProfessorShell";

export default function ProfessorHomePage() {
    return (
        <ProfessorShell>
            <div className="mx-auto max-w-6xl">
                <header className="mb-10">
                    <p className="mb-2 text-sm font-normal text-[#aa8fc5]">Painel do professor</p>
                    <h1 className="text-3xl font-bold md:text-4xl">Olá, professor!</h1>
                    <p className="mt-3 max-w-xl text-sm font-normal leading-6 text-[#b9afc5]">
                        Gerencie suas aulas e compartilhe conhecimento com seus alunos.
                    </p>
                </header>

                <div className="rounded-2xl border border-white/10 bg-[#1a0931] p-6 md:p-8">
                    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">
                        <div>
                            <p className="mb-2 text-sm font-normal text-[#aa8fc5]">Acesso rápido</p>
                            <h2 className="text-2xl font-bold">Comece uma nova aula</h2>
                            <p className="mt-2 text-sm font-normal text-[#b9afc5]">
                                Crie uma aula para disponibilizar um novo conteúdo.
                            </p>
                        </div>
                        <Link
                            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8d4ed0] to-[#3e70a1] px-6 py-3 text-sm transition-transform hover:scale-[1.02] active:scale-95"
                            href="/professor/criar-aula"
                        >
                            Criar aula
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 border-t border-white/10 pt-5 text-sm font-normal text-[#91849f]">
                        <span className="h-2 w-2 rounded-full bg-[#9d5ce9]" />
                        Nenhuma aula criada ainda
                    </div>
                </div>
            </div>
        </ProfessorShell>
    );
}
