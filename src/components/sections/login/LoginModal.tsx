import { useState } from "react";
import { UserRound, Eye, EyeOff } from "lucide-react";

export default function LoginModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative w-[90%] max-w-sm rounded-2xl bg-white px-6 py-10 shadow-xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-500"
        >
          ✕
        </button>

        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="rounded-xl bg-white border border-blue-200 shadow-md p-3">
            <UserRound />
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-semibold mb-2">
          {mode === "login" ? "Login or signup" : "Create your account"}
        </h2>
        <p className="text-center text-md text-slate-500 mb-8">
          Please login to continue to your account.
        </p>

        {/* ---------------- LOGIN UI ---------------- */}
        {mode === "login" && (
          <>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 w-full rounded-lg border px-3 py-3"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border px-3 py-3 pr-10 tracking-[0.2em]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="mb-4 w-full rounded-lg bg-blue-600 py-3 text-white font-medium"
            >
              Login
            </button>

            <div className="mb-3 text-center text-xs text-slate-400">or</div>

            <button className="w-full rounded-lg border py-3 flex items-center justify-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Log in with Google
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
              Not registered yet?{" "}
              <span
                onClick={() => setMode("register")}
                className="cursor-pointer text-blue-600 font-medium"
              >
                Create an account
              </span>
            </p>
          </>
        )}

        {/* ---------------- REGISTER UI ---------------- */}
        {mode === "register" && (
          <>
            <button className="mb-4 w-full rounded-lg border py-3 flex items-center justify-center gap-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Log in with Google
            </button>

            <div className="mb-3 text-center text-xs text-slate-400">or</div>

            <input
              type="text"
              placeholder="Full Name"
              className="mb-3 w-full rounded-lg border px-3 py-3"
            />

            <input
              type="tel"
              placeholder="Phone no."
              className="mb-3 w-full rounded-lg border px-3 py-3"
            />

            <input
              type="email"
              placeholder="Email address"
              className="mb-3 w-full rounded-lg border px-3 py-3"
            />

            <div className="relative mb-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border px-3 py-3 pr-10 tracking-[0.2em]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mb-4 text-xs text-slate-400">
              Must contain 1 uppercase letter, 1 number, min 8 characters
            </p>

            <button className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium">
              Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}
