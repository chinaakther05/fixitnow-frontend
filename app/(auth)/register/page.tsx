 // তোমার আসল import path বসাও

import RegisterForm from "../-components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;