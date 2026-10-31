import type {
    LoginResponse,
    RegisterStudentInput,
    UserRole
} from "@/src/types/auth"

export async function registerStudent(dados: RegisterStudentInput) {
    const formData = new FormData();
    formData.append("nome", dados.nome);
    formData.append("email", dados.email);
    formData.append("senha", dados.senha);
    formData.append("confirmeSenha", dados.confirmeSenha);

    const response = await fetch
}