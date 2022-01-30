
export interface Authentication{
  auth: (params: AuthenticationModel) => Promise<string>
}

export interface AuthenticationModel {
  email: string
  password: string
}
