import { SignupForm } from "../components/auth/SignupForm"
import { AuthLayout } from "../layouts/AuthLayout"


export const Signup = () => {

    return (
        <AuthLayout mode="signup">
            <SignupForm/>
        </AuthLayout>
    )
}