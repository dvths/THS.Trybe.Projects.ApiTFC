import { ILogin } from '../../Interfaces/ILoginService';

interface IMockLogin extends Partial<ILogin> {
  badEmail?: string | null;
  badPassword?: string | null;
}

// Sucesso
const credentials: ILogin = {
  email: 'user@email.com',
  password: 'any_pass',
};

// Quando o email não é informado
const emailNotInformad: IMockLogin = {
  badEmail: null,
  password: credentials.password,
};

// Quando o password não é informado
const passwordNotInformad: IMockLogin = {
  email: credentials.email,
  badPassword: null,
};

// Quando o email informado existe no banco e a senha é incorreta
const wrongPass: IMockLogin = {
  email: credentials.email,
  badPassword: 'wrong_pass',
};

// Quando o email informado é incorreto
const worngEmail: IMockLogin = {
  badEmail: 'wrong_email',
  password: credentials.password,
};

// Quando o email é informado e não existe no banco
const emailNotExists: IMockLogin = {
  badEmail: 'not-exist@email.com',
  password: credentials.password,
};

export const login = {
  data: credentials,
  requests: {
    success: {
      email: credentials.email,
      password: credentials.password,
    },
    emptyEmail: {
      email: emailNotInformad.badEmail,
      password: credentials.password,
    },
    emptyPassword: {
      email: credentials.email,
      password: passwordNotInformad.badPassword,
    },
    wrongEmail: {
      email: worngEmail.badEmail,
      password: credentials.password,
    },
    wrongPassword: {
      email: credentials.email,
      password: wrongPass.badPassword,
    },
    emailNonExist: {
      email: emailNotExists.badEmail,
      password: credentials.password,
    },
  },
};
