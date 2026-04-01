import React, { useState, useEffect, useRef } from "react";
import { Mail, Lock, ArrowRight, Github, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import gsap from "gsap";
import { useAuth } from "../context/AuthContext";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

// --- Types ---
type AuthMode = "signin" | "signup";

interface AuthFormProps {
  onSuccess: (user: { email: string }) => void;
  onBack: () => void;
}

// --- Reusable Components ---
const InputField = ({ 
  label, 
  type, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  error,
  disabled 
}: {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon: any;
  error?: string;
  disabled?: boolean;
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">
      {label}
    </label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-accent transition-colors">
        <Icon size={18} />
      </div>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full bg-zinc-900/50 border rounded-2xl py-4 pl-12 pr-4 text-sm text-white outline-none transition-all
          ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-accent'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      />
    </div>
    {error && <p className="text-[10px] text-red-500 font-medium ml-1 uppercase tracking-wider">{error}</p>}
  </div>
);

export default function AuthForm({ onSuccess, onBack }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { user } = useAuth();
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // --- Animations ---
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [mode]);

  const handleButtonHover = (enter: boolean) => {
    if (!buttonRef.current || isLoading) return;
    gsap.to(buttonRef.current, {
      scale: enter ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // --- Logic ---
  const toggleMode = () => {
    setMode(prev => prev === "signin" ? "signup" : "signin");
    setEmail("");
    setPassword("");
    setErrors({});
    setApiError(null);
    setSuccessMsg(null);
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8) newErrors.password = "Minimum 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError(null);
    setSuccessMsg(null);
    
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg("Welcome back!");
        setTimeout(() => {
          onSuccess({ email: auth.currentUser?.email || "" });
        }, 1000);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg("Account created! Please sign in.");
        setTimeout(() => {
          setMode("signin");
          setPassword("");
          setSuccessMsg(null);
        }, 2000);
      }
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: any) => {
    setIsLoading(true);
    setApiError(null);
    try {
      await signInWithPopup(auth, provider);
      setSuccessMsg("Welcome!");
      setTimeout(() => {
        onSuccess({ email: auth.currentUser?.email || "" });
      }, 1000);
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100dvh] bg-black flex flex-col items-center justify-start pt-20 pb-32 px-6 relative overflow-y-auto">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div ref={formRef} className="w-full max-w-md mx-auto relative z-10">
        <div className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
          
          {/* Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-3">
              {mode === "signin" ? "Welcome Back" : "Join the Elite"}
            </h2>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] font-bold">
              {mode === "signin" ? "Sign in to your professional account" : "Create your member profile today"}
            </p>
          </div>

          {/* Feedback */}
          {apiError && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 text-[10px] uppercase tracking-widest font-bold">
              <AlertCircle size={16} />
              {apiError}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-500 text-[10px] uppercase tracking-widest font-bold">
              <CheckCircle2 size={16} />
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField 
              label="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="name@example.com"
              icon={Mail}
              error={errors.email}
              disabled={isLoading}
            />

            <InputField 
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              icon={Lock}
              error={errors.password}
              disabled={isLoading}
            />

            <button 
              ref={buttonRef}
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => handleButtonHover(true)}
              onMouseLeave={() => handleButtonHover(false)}
              className="w-full bg-accent text-white py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[10px] transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Processing</span>
                </>
              ) : (
                <>
                  <span>{mode === "signin" ? "Sign In" : "Create Account"}</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer Actions */}
          <div className="mt-10 space-y-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
                <span className="bg-zinc-900/40 px-4 text-zinc-600 font-bold">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => handleOAuthLogin(googleProvider)}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-zinc-400 hover:text-white group disabled:opacity-50"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current group-hover:scale-110 transition-transform">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-widest">Google</span>
              </button>
              <button 
                type="button"
                onClick={() => handleOAuthLogin(githubProvider)}
                disabled={isLoading}
                className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all text-zinc-400 hover:text-white group disabled:opacity-50"
              >
                <Github size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Github</span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
                {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
                <button 
                  type="button"
                  onClick={toggleMode}
                  className="ml-2 text-accent hover:underline decoration-2 underline-offset-4"
                >
                  {mode === "signin" ? "Sign up" : "Login"}
                </button>
              </p>

              <button 
                type="button"
                onClick={onBack}
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 hover:text-white font-black transition-colors"
              >
                Cancel and return
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
