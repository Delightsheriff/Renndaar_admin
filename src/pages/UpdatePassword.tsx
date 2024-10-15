import UpdateForm from "@/features/authentication/UpdateForm";

export default function UpdatePassword() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <img src="/icon.svg" alt="Logo" />
      </div>
      <div className="w-full max-w-sm">
        <UpdateForm />
      </div>
    </div>
  );
}
