export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3333/v1";


export function handleUnauthorizedResponse(response: Response) {
  if (response.status === 401 && typeof window !== "undefined") {
    if (window.location.pathname !== "/login") {
      window.location.replace("/login");
    }
  }
}

export function handleForbiddenResponse(response: Response) {
  if (response.status === 403 && typeof window !== "undefined") {
    if (window.location.pathname !== "/acesso-negado") {
      window.location.replace("/acesso-negado");
    }
  }
}

const DEFAULT_ERROR_MESSAGE = "Não foi possível concluir a solicitação.";

type ApiErrorResponse = {
  error?: unknown;
  message?: unknown;
};

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

function isTechnicalMessage(message: string) {
  return /(?:prisma|sql|database|constraint|stack|exception|internal server|erro interno)/i.test(
    message,
  );
}

function fallbackMessage(status: number) {
  if (status === 401)
    return "Sua sessão expirou. Entre novamente para continuar.";
  if (status === 403)
    return "Você não tem permissão para realizar esta ação.";
  if (status === 404) return "Não encontramos o que você procurava.";
  if (status === 429)
    return "Muitas tentativas. Aguarde alguns minutos e tente novamente.";
  if (status >= 500)
    return "O serviço está indisponível no momento. Tente novamente mais tarde.";
  if (status >= 400) return "Confira os dados informados e tente novamente.";
  return DEFAULT_ERROR_MESSAGE;
}

export function getApiErrorRoute(error: unknown) {
  if (!(error instanceof ApiError)) return null;
  if (error.status === 429) return "/erro/429";
  if (error.status >= 500) return "/erro/500";
  return null;
}

export function getErrorMessage(
  error: unknown,
  fallback = DEFAULT_ERROR_MESSAGE,
) {
  if (error instanceof TypeError) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export async function readApiResponse<T>(response: Response): Promise<T> {
  handleUnauthorizedResponse(response);
  handleForbiddenResponse(response);
  const data = (await response.json().catch(() => null)) as
    | (T & ApiErrorResponse)
    | null;

  if (!response.ok) {
    const backendMessage =
      typeof data?.error === "string" && data.error.trim()
        ? data.error.trim()
        : typeof data?.message === "string" && data.message.trim()
          ? data.message.trim()
          : null;
    const message =
      backendMessage && !isTechnicalMessage(backendMessage)
        ? backendMessage
        : fallbackMessage(response.status);

    throw new ApiError(message, response.status);
  }

  if (data === null) {
    throw new ApiError(
      "O servidor retornou uma resposta inválida. Tente novamente.",
      response.status,
    );
  }

  return data as T;
}