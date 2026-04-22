import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env._JWT_SECRET || "secret";

// listando quais métodos https e rotas podem ser acessadas sem o token
const allowedPaths = {
  "GET": ["/users/*"], // qualquer rota de usuários
  "POST": ["/register", "/login"], // login e registro de usuários
} as const;

// recebe a rota da requisição (path) e a rota permitida (pattern)
function matchPatch(path: string, pattern: string): boolean {
  if (pattern.endsWith("/*")) { // se a rota termina com "/*" (cobre todas as rotas e seus endpoints)
    const prefix = pattern.slice(0, -1); // remove o "/*"
    return path.startsWith(prefix); // retorna True se o path começa com o prefixo 
  }
  return path === pattern; // se não termina com "/*", faz comparação exata
}

export interface AuthRequest extends Request { // extende o tipo 'Request' pra adicionar a propriedade "user", sendo opcional, porque nem toda
// requisição tem um token, por exemplo, pode haver rotas públicas, mas se tiver, o middleware aidicona o "user" ao "req"
    user?: {
        id: string;
        email: string;
    };
}

// declara uma função middleware que recebe o objeto da requisição, "req" (agora com o AuthRequest)
// 'res' -> envio de resposta e 'next' -> função pra prosseguir ao próx middleware
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const method = req.method as keyof typeof allowedPaths; // pega o método da requisição e força o tipo pro typescript aceitar como chave do allowedPaths
  const path = req.path; // pega o caminho da rota

  const isPublicRoute = allowedPaths[method]?.some(pattern => matchPatch(path, pattern)); // verifica se existe uma rota no allowedPaths que dá match com o path atual
  
  if (isPublicRoute) { // se existir, é porque é pública, logo ela segue pra próxima função
    return next();
  }
  
  const authHeader = req.headers.authorization; // pega o header da requisição ex:. "Bearer 242DSDFGasd342dasf34as.."
  
  if (!authHeader) { // se não houver, retorna erro 401
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // pega o Bearer e usa o split pra separar por partes e pega penas a posição 1

  if (!token) { // se estiver errado e não houver token, retorna erro
    return res.status(401).json({ error: "Token format invalid" });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string; email: string }; // verifica se o token que buscamos é válido e não expirou
    req.user = decoded; // se é válido, ele decodifica (volta aos dados originais e consegue acessar, por exemplo, o id e o e-mail, sabendo quem tá acessando a rota) ao req.user
    next(); // segue pra próxima rota/controller
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

};