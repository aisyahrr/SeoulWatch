import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppHeader({ title }) {
  const navigate = useNavigate();

  return (
    <header className="
      fixed top-0 left-0 right-0 z-50
      flex items-center gap-3 px-4 py-3
      bg-gradient-to-b from-black/80 to-transparent
      text-white
    ">
      <button onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-sm md:text-base font-semibold">{title}</h1>
    </header>
  );
}
