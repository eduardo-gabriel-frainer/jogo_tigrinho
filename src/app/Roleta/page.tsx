
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

    const somRoleta = typeof Audio !== "undefined" ? new Audio("/roleta.mp3") : null;
    const somVitoria = typeof Audio !== "undefined" ? new Audio("/acerto.mp3") : null;
    const somDerrota = typeof Audio !== "undefined" ? new Audio("/derrota.mp3") : null;

    const girar = () => {
        if (aposta === "" || aposta <= 0) {
            setMensagem("⚠️ Digite um valor válido para apostar.");
            return;
        }

        if (somRoleta) somRoleta.play();
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
                if (somVitoria) somVitoria.play();
            } else if (a === b || a === c || b === c) {
                ganho = apostaValor * 1.5;
                setMensagem(`✨ Você ganhou R$ ${ganho.toFixed(2)}!`);
                if (somVitoria) somVitoria.play();
            } else {
                ganho = -apostaValor;
                setMensagem(`💀 Você perdeu R$ ${apostaValor.toFixed(2)}.`);
                if (somDerrota) somDerrota.play();
            }

            setSaldo((prev) => {
                const novoSaldo = Math.max(prev + ganho, 0);

                if (novoSaldo === 0) {
                    setTimeout(() => {
                        if (confirm("💀 Você perdeu tudo! Quer recomeçar o jogo?")) {
                            recomeçar();
                        }
                    }, 1000);
                } else if (novoSaldo > 0 && novoSaldo < 1) {
                    setTimeout(() => {
                        if (confirm("⚠️ Seu saldo é insuficiente para continuar. Quer recomeçar o jogo?")) {
                            recomeçar();
                        }
                    }, 500);
                }

                return novoSaldo;
            });

            setGirando(false);
            setAposta("");
        }, 2000);
    };

    const recomeçar = () => {
        setSaldo(10);
        setMensagem("✅ Jogo reiniciado!");
        setRoleta(["❓", "❓", "❓"]);
    };

    const parar = () => {
        alert(`Você parou com R$ ${saldo.toFixed(2)}`);
        recomeçar();
    };

    return (
        <main className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-[Arial] text-white flex flex-col items-center justify-center text-center px-4">

            <Link
                href="/"
                className="absolute top-4 left-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:scale-103 hover:shadow-[0_0_10px_#00c6ff] transition"
            >
                ← Voltar
            </Link>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent p-2 bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 text-center drop-shadow-lg">
                Caça Niquel
            </h1>

            <div className="my-4 text-2xl text-[#00ffcc] drop-shadow-[0_0_10px_#00ffaa]">
                Saldo acumulado: R$ {saldo.toFixed(2)}
            </div>

            
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
                onChange={(e) => setAposta(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="px-4 py-2 w-[160px] rounded-xl border border-white/30 bg-white/10 text-white mt-4 text-center text-base backdrop-blur-sm placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
            />

            {/* Roletas */}
            <div className="flex gap-6 justify-center my-6 backdrop-blur-md bg-white/5 p-5 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/10">
                {roleta.map((simbolo, idx) => (
                    <div
                        key={idx}
                        className="w-[100px] h-[100px] border border-white/20 rounded-xl flex items-center justify-center text-5xl bg-white/10 hover:bg-white/20 transition-all duration-200"
                    >
                        {simbolo}
                    </div>
                ))}
            </div>

            {/* Botão Girar abaixo das roletas */}
            <div className="mb-4">
                <button
                    onClick={girar}
                    disabled={girando}
                    className={`px-5 py-3 text-lg font-bold rounded-xl shadow-lg transition
                        ${girando
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-[#00FFFF] to-[#03bb85] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_10px_#ff512f]"
                        }`}
                >
                    {girando ? "Girando..." : "🎯 Girar"}
                </button>
            </div>

            {/* Botão Parar mais abaixo */}
            <div className="mb-6">
                <button
                    onClick={parar}
                    className="px-6 py-3 mt-2 text-lg font-bold rounded-xl bg-gradient-to-r from-[#ff512f] to-[#dd2476] shadow-lg transition-all duration-300 hover:scale-103 hover:shadow-[0_0_10px_#ff512f]"
                >
                    Parar com o saldo atual
                </button>
            </div>

            <div className="mt-2 text-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] min-h-[1.5em]">
                {mensagem}
            </div>
        </main>
    );
}

