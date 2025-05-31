"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
    const linhas = 5;
    const colunas = 5;
    const [minas, setMinas] = useState<boolean[][]>([]);
    const [saldo, setSaldo] = useState(0);
    const [jogoAtivo, setJogoAtivo] = useState(true);
    const [message, setMessage] = useState("");
    const [aposta, setAposta] = useState<number | "">("");
    const [celulasReveladas, setCelulasReveladas] = useState(
        new Set<string>()
    );

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
        setMessage("Escolha uma célula!");
        setCelulasReveladas(new Set());
    };

    const atualizarSaldo = (novoSaldo: number) => {
        setSaldo(novoSaldo);
    };

    const revelarCelula = (x: number, y: number) => {
        if (!jogoAtivo) return;
        if (aposta === "" || aposta <= 0) {
            setMessage("Digite um valor válido para apostar.");
            return;
        }

        const chave = `${x}-${y}`;
        if (celulasReveladas.has(chave)) return;

        const novasReveladas = new Set(celulasReveladas);
        novasReveladas.add(chave);
        setCelulasReveladas(novasReveladas);

        if (minas[x][y]) {
            somExplosao?.play();
            setMessage(`💥 BOOM! Você perdeu R$ ${aposta.toFixed(2)}.`);
            setJogoAtivo(false);
            setTimeout(() => {
                alert("Você perdeu tudo!");
                atualizarSaldo(0);
                iniciarJogo();
            }, 1000);
        } else {
            const premio = (aposta as number) * 1.5;
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
        <main className="h-screen bg-[#1a1a2f] font-[Orbitron] text-white flex flex-col items-center justify-center text-center">

            <Link
                href="/"
                className={`absolute top-0 left-0 m-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-[#006400] to-[#004d33] hover:scale-105 hover:shadow-[0_0_20px_#006400]`}

            >
                Voltar
            </Link>

            <h1 className="text-5xl text-[#ffcc00] mb-2 drop-shadow-[0_0_15px_#ffcc00] drop-shadow-[0_0_25px_#ffaa00]">
                💣 Campo Minado 💣
            </h1>

            <div className="my-2 text-xl text-[#00ffcc] drop-shadow-[0_0_8px_#00ffaa]">
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
                onChange={(e) =>
                    setAposta(e.target.value === "" ? "" : parseFloat(e.target.value))
                }
                className="px-4 py-2 w-[150px] rounded-[15px] border border-white/30 bg-white/10 text-white mt-2 text-center text-base backdrop-blur-sm placeholder:text-white/70"
            />

            <button
                onClick={pararJogo}
                className="px-6 py-3 m-3 text-lg font-bold text-[#222] rounded-full bg-gradient-to-r from-[#ff9800] to-[#ffcc00] shadow-[0_0_15px_#ffcc00,0_0_20px_#ffaa00_inset] transition-transform hover:scale-105 hover:shadow-[0_0_25px_#ffcc00,0_0_30px_#ffaa00_inset]"
            >
                Parar com o saldo atual
            </button>

            <div className="grid grid-cols-5 gap-2 justify-center my-6 backdrop-blur-md bg-white/5 p-3 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.5)] border border-white/10">
                {Array.from({ length: linhas }).map((_, i) =>
                    Array.from({ length: colunas }).map((_, j) => {
                        const chave = `${i}-${j}`;
                        const revelado = celulasReveladas.has(chave);
                        const isMina = minas[i]?.[j];

                        return (
                            <div
                                key={chave}
                                onClick={() => revelarCelula(i, j)}
                                className={`w-[50px] h-[50px] border border-white/20 rounded-xl flex items-center justify-center cursor-pointer text-2xl transition 
                ${revelado
                                        ? isMina
                                            ? "bg-[#990000] animate-explode"
                                            : "bg-[#00ffaa]"
                                        : "bg-white/10 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_10px_#00ffaa] active:scale-95"
                                    }`}
                            >
                                {revelado && (isMina ? "💣" : "✅")}
                            </div>
                        );
                    })
                )}
            </div>

            <div className="mt-5 text-lg drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] min-h-[1.5em]">
                {message}
            </div>
        </main>
    );
}
