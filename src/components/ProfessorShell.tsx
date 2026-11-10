"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon() {
    return (
        <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
            <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
        </svg>
    );
}

export default function ProfessorShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCreateLesson = pathname === "/professor/criar-aula";

    return (
        <main className="min-h-screen bg-[#100324] text-white md:flex">
            <aside className="flex w-full flex-col border-b border-white/10 bg-[#18062f] px-5 py-5 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:px-7 md:py-8">
                <div className="mb-10 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#9d5ce9] to-[#3e70a1] text-xl font-black">
                        E
                    </div>
                    <div>
                        <p className="text-base font-bold tracking-wide">Educa</p>
                        <p className="text-xs font-normal text-[#a99bb8]">Área do professor</p>
                    </div>
                </div>

                <nav aria-label="Navegação do professor" className="flex gap-2 md:flex-col">
                    <Link
                        className={`flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors md:flex-none ${
                            !isCreateLesson ? "bg-[#6d35a3] text-white" : "text-[#b9afc5] hover:bg-white/10 hover:text-white"
                        }`}
                        href="/professor"
                    >
                        <HomeIcon />
                        Início
                    </Link>
                    <Link
                        className={`flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors md:flex-none ${
                            isCreateLesson ? "bg-[#6d35a3] text-white" : "text-[#b9afc5] hover:bg-white/10 hover:text-white"
                        }`}
                        href="/professor/criar-aula"
                    >
                        <PlusIcon />
                        Criar aula
                    </Link>
                </nav>
            </aside>

            <section className="flex-1 px-5 py-8 md:px-12 md:py-12">
                {children}
            </section>
        </main>
    );
}
