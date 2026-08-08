import { LoginForm } from "../components/auth/LoginForm"
import { AuthLayout } from "../layouts/AuthLayout"


export const Login = () => {

    return (
        <AuthLayout mode="login">
            <LoginForm/>
        </AuthLayout>
    )
}