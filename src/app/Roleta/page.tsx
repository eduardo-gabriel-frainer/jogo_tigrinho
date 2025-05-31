"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
    const simbolos = ["🍒", "🔔", "🍋", "💎", "⭐", "7️⃣"];
    const [roleta, setRoleta] = useState(["❓", "❓", "❓"]);
    const [saldo, setSaldo] = useState(10);
    const [aposta, setAposta] = useState<number | "">("");
    const [mensagem, setMensagem] = useState("");
    const [girando, setGirando] = useState(false);

    const girar = () => {
        if (aposta === "" || aposta <= 0) {
            setMensagem("⚠️ Digite um valor válido para apostar.");
            return;
        }

        setGirando(true);
        setMensagem("🎰 Girando...");

        const intervalo = setInterval(() => {
            setRoleta([
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
            ]);
        }, 100);

        setTimeout(() => {
            clearInterval(intervalo);

            const resultado = [
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
            ];
            setRoleta(resultado);

            const [a, b, c] = resultado;
            const apostaValor = aposta as number;
            let ganho = 0;

            if (a === b && b === c) {
                ganho = apostaValor * 3;
                setMensagem(`🎉 PARABÉNS! Você ganhou R$ ${ganho.toFixed(2)}!`);
            } else if (a === b || a === c || b === c) {
                ganho = apostaValor * 1.5;
                setMensagem(`✨ Você ganhou R$ ${ganho.toFixed(2)}!`);
            } else {
                ganho = -apostaValor;
                setMensagem(`💀 Você perdeu R$ ${apostaValor.toFixed(2)}.`);
            }

            setSaldo((prev) => Math.max(prev + ganho));
            setGirando(false);
        }, 2000);
    };

    return (
        <main className="h-screen bg-[#1a1a2f] font-[Orbitron] text-white flex flex-col items-center justify-center text-center">

            <Link
                href="/"
                className={`absolute top-0 left-0 m-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-[#006200] to-[#004d33] hover:scale-105 hover:shadow-[0_0_20px_#006200]`}

            >
                ← Voltar
            </Link>

            <h1 className="text-5xl text-[#ffcc00] mb-3 drop-shadow-[0_0_15px_#ffcc00]">
                🎰 Caça Níquel Neon
            </h1>

            <span className={`${saldo >= 0 ? "text-green-400 text-xl" : "text-red-500 text-xl"}`}>
                Saldo acumulado R$ {saldo.toFixed(2)}
            </span>

            <div className="flex flex-wrap gap-4 p-6">
                <button
                    onClick={() => setAposta(1)}
                    className="px-2 py-1 rounded-2xl text-white bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb] transition-all duration-300"
                >
                    1 R$
                </button>

                <button
                    onClick={() => setAposta(3)}
                    className="px-2 py-1 rounded-2xl text-white bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb] transition-all duration-300"
                >
                    3 R$
                </button>

                <button
                    onClick={() => setAposta(5)}
                    className="px-2 py-1 rounded-2xl text-white bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb] transition-all duration-300"
                >
                    5 R$
                </button>

                <button
                    onClick={() => setAposta(10)}
                    className="px-2 py-1 rounded-2xl text-white bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb] transition-all duration-300"
                >
                    10 R$
                </button>

                <button
                    onClick={() => setAposta(50)}
                    className="px-2 py-1 rounded-2xl text-white bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb] transition-all duration-300"
                >
                    50 R$
                </button>
            </div>

            <input
                readOnly
                type="number"
                min={1}
                placeholder="Aposte aqui"
                value={aposta}
                onChange={(e) =>
                    setAposta(e.target.value === "" ? "" : parseFloat(e.target.value))
                }
                className="px-4 py-2 w-[150px] rounded-[15px] border border-white/30 bg-white/10 text-white mt-2 text-center text-base backdrop-blur-sm placeholder:text-white/70"
            />

            <div className="flex gap-6 my-5 flex-wrap justify-center">
                <button
                    onClick={girar}
                    disabled={girando}
                    className={`px-6 py-3 rounded-full text-lg font-bold ${girando
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#00ffaa] to-[#00cc88] hover:scale-105 hover:shadow-[0_0_20px_#00ffaa]"
                        }`}
                >
                    {girando ? "Girando..." : "Girar"}
                </button>
            </div>

            <div className="flex gap-8 justify-center mb-6">
                {roleta.map((simbolo, idx) => (
                    <div
                        key={idx}
                        className="w-[100px] h-[100px] bg-white/10 rounded-[20px] border border-white/20 flex items-center justify-center text-5xl shadow-[0_0_25px_#00ffaa]"
                    >
                        {simbolo}
                    </div>
                ))}
            </div>

            <div className="text-lg min-h-[1.5em]">{mensagem}</div>
        </main>
    );
}
