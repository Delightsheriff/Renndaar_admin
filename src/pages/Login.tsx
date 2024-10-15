import LoginForm from "@/features/authentication/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <img src="/icon.svg" alt="Logo" />
      </div>
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
