export type UserRole = "ALUNO" | "PROFESSOR" | "ADMINISTRADOR";

export type LoginResponse = {
    id: string;
    email: string;
    role: UserRole
}

export type RegisterStudentInput = {
    nome: string;
    email: string;
    senha: string;
    confirmeSenha: string;
}