
import RegisterForm from "../-components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8 text-foreground">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create your account
        </h1>

        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
