export interface User {
    id: string
    fullName: string
    email: string
    avatar?: string
    createdAt: string
}
  
export interface AuthFormData {
    fullName?: string
    email: string
    password: string
}