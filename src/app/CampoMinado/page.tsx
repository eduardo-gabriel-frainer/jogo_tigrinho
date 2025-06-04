"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const linhas = 5;
    const colunas = 5;
    const [minas, setMinas] = useState<boolean[][]>([]);
    const [saldo, setSaldo] = useState(10);
    const [jogoAtivo, setJogoAtivo] = useState(true);
    const [message, setMessage] = useState("");
    const [aposta, setAposta] = useState<number | "">("");
    const [celulasReveladas, setCelulasReveladas] = useState(new Set<string>());

    const somExplosao = typeof Audio !== "undefined" ? new Audio("/explosion.mp3") : null;
    const somAcerto = typeof Audio !== "undefined" ? new Audio("/acerto.mp3") : null;

    useEffect(() => {
        iniciarJogo();
    }, []);

    const iniciarJogo = () => {
        const novaMatriz = Array.from({ length: linhas }, () =>
            Array.from({ length: colunas }, () => false)
        );

        let minasAdicionadas = 0;
        while (minasAdicionadas < 5) {
            const x = Math.floor(Math.random() * linhas);
            const y = Math.floor(Math.random() * colunas);
            if (!novaMatriz[x][y]) {
                novaMatriz[x][y] = true;
                minasAdicionadas++;
            }
        }

        setMinas(novaMatriz);
        setJogoAtivo(true);
        setMessage("🚀 Escolha uma célula!");
        setCelulasReveladas(new Set());
    };

    const atualizarSaldo = (novoSaldo: number) => {
        setSaldo(novoSaldo);
    };

    const revelarCelula = (x: number, y: number) => {
        if (!jogoAtivo) return;
        if (aposta === "" || aposta <= 0) {
            setMessage("⚠️ Digite um valor válido para apostar.");
            return;
        }

        const chave = `${x}-${y}`;
        if (celulasReveladas.has(chave)) return;

        const novasReveladas = new Set(celulasReveladas);
        novasReveladas.add(chave);
        setCelulasReveladas(novasReveladas);

        if (minas[x][y]) {
            somExplosao?.play();
            setMessage(`💥 BOOM! Você perdeu R$ ${Number(aposta).toFixed(2)}.`);
            setJogoAtivo(false);
            setTimeout(() => {
                alert("Você perdeu tudo!");
                atualizarSaldo(0);
                iniciarJogo();
            }, 1000);
        } else {
            const premio = Number(aposta) * 1.5;
            const novoSaldo = saldo + premio;
            somAcerto?.play();
            setMessage(`🎉 Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
            atualizarSaldo(novoSaldo);
        }
    };

    const pararJogo = () => {
        alert(`Você parou com R$ ${saldo.toFixed(2)}`);
        atualizarSaldo(0);
        iniciarJogo();
    };

    return (
        <main className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-[Arial] text-white flex flex-col items-center justify-center text-center px-4">

            <Link
                href="/"
                className="absolute top-4 left-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:scale-105 hover:shadow-[0_0_20px_#00c6ff] transition"
            >
                ← Voltar
            </Link>

            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent p-2 bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 text-center drop-shadow-lg">
                Campo Minado
            </h1>

            <div className="my-4 text-2xl text-[#00ffcc] drop-shadow-[0_0_10px_#00ffaa]">
                Ganhos acumulados: R$ {saldo.toFixed(2)}
            </div>

            <div className="flex flex-wrap gap-4 p-4">
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

            <button
                onClick={pararJogo}
                className="px-6 py-3 mt-6 text-lg font-bold text-[#222] rounded-xl bg-gradient-to-r from-[#ff512f] to-[#dd2476] shadow-lg transition-all duration-300 hover:scale-103 hover:shadow-[0_0_10px_#ff512f]"
            >
                Parar com o saldo atual
            </button>

            <div className="grid grid-cols-5 gap-3 justify-center my-8 backdrop-blur-md bg-white/5 p-5 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-white/10">
                {Array.from({ length: linhas }).map((_, i) =>
                    Array.from({ length: colunas }).map((_, j) => {
                        const chave = `${i}-${j}`;
                        const revelado = celulasReveladas.has(chave);
                        const isMina = minas[i]?.[j];

                        return (
                            <div
                                key={chave}
                                onClick={() => revelarCelula(i, j)}
                                className={`w-[60px] h-[60px] border border-white/20 rounded-xl flex items-center justify-center cursor-pointer text-2xl transition-all duration-200
                                    ${revelado
                                        ? isMina
                                            ? "bg-[#ff1744]"
                                            : "bg-[#00e676]"
                                        : "bg-white/10 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_10px_#00ffaa] active:scale-95"
                                    }`}
                            >
                                {revelado && (isMina ? "💣" : "✅")}
                            </div>
                        );
                    })
                )}
            </div>

            <div className="mt-4 text-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] min-h-[1.5em]">
                {message}
            </div>
        </main>
    );
}
