"use client"; // Indica que este componente é um componente Client do Next.js

import Link from "next/link"; // Importa Link para navegação
import { useEffect, useState } from "react"; // Importa hooks do React

export default function Home() {
    // Definições das linhas e colunas do campo
    const linhas = 5;
    const colunas = 5;

    // Estados do jogo
    const [minas, setMinas] = useState<boolean[][]>([]); // Matriz que armazena a localização das minas
    const [saldo, setSaldo] = useState(10); // Saldo do jogador
    const [jogoAtivo, setJogoAtivo] = useState(true); // Estado que indica se o jogo está ativo
    const [message, setMessage] = useState(""); // Mensagem exibida ao jogador
    const [aposta, setAposta] = useState<number | "">(""); // Valor da aposta
    const [celulasReveladas, setCelulasReveladas] = useState(new Set<string>()); // Células já clicadas

    // Sons de acerto e explosão
    const somExplosao = typeof Audio !== "undefined" ? new Audio("/explosion.mp3") : null;
    const somAcerto = typeof Audio !== "undefined" ? new Audio("/acerto.mp3") : null;

    // useEffect para iniciar o jogo ao carregar a página
    useEffect(() => {
        iniciarJogo();
    }, []);

    // Função para iniciar ou reiniciar o jogo
    const iniciarJogo = () => {
        const novaMatriz = Array.from({ length: linhas }, () =>
            Array.from({ length: colunas }, () => false) // Cria uma matriz sem minas
        );

        // Adiciona 5 minas aleatórias na matriz
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

    // Atualiza o saldo do jogador
    const atualizarSaldo = (novoSaldo: number) => {
        setSaldo(novoSaldo);
    };

    // Função executada ao clicar em uma célula
    const revelarCelula = (x: number, y: number) => {
        if (!jogoAtivo) return;

        // Valida se há uma aposta válida
        if (aposta === "" || aposta <= 0) {
            setMessage("⚠️ Digite um valor válido para apostar.");
            return;
        }

        const chave = `${x}-${y}`; // Cria uma chave única para cada célula

        // Se já foi revelada, não faz nada
        if (celulasReveladas.has(chave)) return;

        const novasReveladas = new Set(celulasReveladas);
        novasReveladas.add(chave);
        setCelulasReveladas(novasReveladas);

        // Verifica se clicou em uma mina
        if (minas[x][y]) {
            somExplosao?.play();
            setMessage(`💥 BOOM! Você perdeu R$ ${Number(saldo).toFixed(2)}.`);
            setJogoAtivo(false);
            setTimeout(() => {
                alert("Você perdeu tudo!");
                atualizarSaldo(10);
                iniciarJogo();
            }, 500);
        } else {
            // Se não for mina, calcula o prêmio e atualiza o saldo
            const premio = Number(saldo) * 1.5;
            const novoSaldo = saldo + premio;
            somAcerto?.play();
            setMessage(`🎉 Parabéns! Você ganhou R$ ${premio.toFixed(2)}!`);
            atualizarSaldo(novoSaldo);
        }
    };

    // Função para parar o jogo manualmente
    const pararJogo = () => {
        alert(`Você parou com R$ ${saldo.toFixed(2)}`);
        atualizarSaldo(10);
        iniciarJogo();
    };

    return (
        <main className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-[Arial] text-white flex flex-col items-center justify-center text-center px-4">

            {/* Botão de voltar */}
            <Link
                href="/"
                className="absolute top-4 left-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:scale-105 hover:shadow-[0_0_20px_#00c6ff] transition"
            >
                ← Voltar
            </Link>

            {/* Título do jogo */}
            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent p-2 bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 text-center drop-shadow-lg">
                Campo Minado
            </h1>

            {/* Saldo atual */}
            <div className="my-4 text-2xl text-[#00ffcc] drop-shadow-[0_0_10px_#00ffaa]">
                Ganhos acumulados: R$ {saldo.toFixed(2)}
            </div>

            {/* Botões de aposta */}
            <div className="flex flex-wrap gap-4 p-6">
                {/* Botão aposta 1 */}
                <button
                    onClick={() => setAposta(1)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    1 R$
                </button>

                {/* Botão aposta 3 */}
                <button
                    onClick={() => setAposta(3)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    3 R$
                </button>

                {/* Botão aposta 5 */}
                <button
                    onClick={() => setAposta(5)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    5 R$
                </button>

                {/* Botão aposta 10 */}
                <button
                    onClick={() => setAposta(10)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 10 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    10 R$
                </button>

                {/* Botão aposta 50 */}
                <button
                    onClick={() => setAposta(50)}
                    disabled={saldo < 50}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 50 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    50 R$
                </button>
            </div>

            {/* Campo de input para aposta manual (somente leitura, controlado pelos botões) */}
            <input
                readOnly
                type="number"
                min={1}
                placeholder="Aposte aqui"
                value={aposta}
                onChange={(e) => setAposta(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="px-4 py-2 w-[160px] rounded-xl border border-white/30 bg-white/10 text-white mt-4 text-center text-base backdrop-blur-sm placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
            />

            {/* Botão para parar o jogo */}
            <button
                onClick={pararJogo}
                className="px-6 py-3 mt-6 text-lg font-bold text-[#222] rounded-xl bg-gradient-to-r from-[#ff512f] to-[#dd2476] shadow-lg transition-all duration-300 hover:scale-103 hover:shadow-[0_0_10px_#ff512f]"
            >
                Parar com o saldo atual
            </button>

            {/* Grid do campo minado */}
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
                                            ? "bg-[#ff1744]" // Célula com mina
                                            : "bg-[#00e676]" // Célula segura
                                        : "bg-white/10 hover:bg-white/20 hover:scale-110 hover:shadow-[0_0_10px_#00ffaa] active:scale-95"
                                    }`}
                            >
                                {revelado && (isMina ? "💣" : "✅")}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Mensagens exibidas ao jogador */}
            <div className="mt-4 text-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] min-h-[1.5em]">
                {message}
            </div>
        </main>
    );
}
