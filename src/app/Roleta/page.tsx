"use client"; // Indica que este componente roda no cliente (Next.js)

import Link from "next/link"; // Importa o componente Link para navegação entre páginas
import { useState } from "react"; // Importa o hook useState para gerenciar estados

// Componente principal da página
export default function Home() {
    // Lista de símbolos possíveis da roleta
    const simbolos = ["🍒", "🔔", "🍋", "💎", "⭐", "7️⃣"];

    // Estados do componente
    const [roleta, setRoleta] = useState(["❓", "❓", "❓"]); // Símbolos atuais exibidos na roleta
    const [saldo, setSaldo] = useState(10); // Saldo do jogador, começa com 10
    const [aposta, setAposta] = useState<number | "">(""); // Valor da aposta atual
    const [mensagem, setMensagem] = useState(""); // Mensagem exibida ao jogador (ganho, perda, alerta)
    const [girando, setGirando] = useState(false); // Controla se a roleta está girando (para desabilitar botões)

    // Carregamento dos sons
    const somRoleta = typeof Audio !== "undefined" ? new Audio("/roleta.mp3") : null;
    const somVitoria = typeof Audio !== "undefined" ? new Audio("/acerto.mp3") : null;
    const somDerrota = typeof Audio !== "undefined" ? new Audio("/derrota.mp3") : null;

    // Função para girar a roleta
    const girar = () => {
        // Validação da aposta
        if (aposta === "" || aposta <= 0) {
            setMensagem("⚠️ Digite um valor válido para apostar.");
            return;
        }

        // Inicia som da roleta
        if (somRoleta) somRoleta.play();

        // Define o estado de girando para true
        setGirando(true);
        setMensagem("🎰 Girando...");

        // Intervalo para simular a roleta girando rapidamente
        const intervalo = setInterval(() => {
            setRoleta([
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
            ]);
        }, 100); // Atualiza a cada 100ms

        // Timeout para parar a roleta após 1.5 segundos
        setTimeout(() => {
            clearInterval(intervalo); // Para o intervalo da roleta

            // Gera o resultado final da roleta
            const resultado = [
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
                simbolos[Math.floor(Math.random() * simbolos.length)],
            ];
            setRoleta(resultado); // Atualiza a interface com o resultado final

            const [a, b, c] = resultado; // Desestrutura os três símbolos
            const apostaValor = aposta as number; // Garante que a aposta é um número
            let ganho = 0; // Variável para armazenar o valor do ganho ou perda

            // Verifica combinações para calcular ganho
            if (a === b && b === c) {
                // Trinca
                ganho = apostaValor * 3;
                setMensagem(`🎉 PARABÉNS! Você ganhou R$ ${ganho.toFixed(2)}!`);
                if (somVitoria) somVitoria.play();
            } else if (a === b || a === c || b === c) {
                // Dupla
                ganho = apostaValor * 1.5;
                setMensagem(`✨ Você ganhou R$ ${ganho.toFixed(2)}!`);
                if (somVitoria) somVitoria.play();
            } else {
                // Nenhuma combinação
                ganho = -apostaValor;
                setMensagem(`💀 Você perdeu R$ ${apostaValor.toFixed(2)}.`);
                if (somDerrota) somDerrota.play();
            }

            // Atualiza o saldo do jogador
            setSaldo((prev) => {
                const novoSaldo = Math.max(prev + ganho, 0); // Garante que não fique negativo

                // Verifica se o saldo acabou ou está insuficiente
                if (novoSaldo <= 0) {
                    setTimeout(() => {
                        if (confirm("💀 Você perdeu tudo! compre outra ficha para continuar!")) {
                            recomecar();
                        }
                    }, 500);
                } else if (novoSaldo < 1) {
                    setTimeout(() => {
                        if (confirm("⚠️ Seu saldo é insuficiente para continuar. Quer recomeçar o jogo?")) {
                            recomecar();
                        }
                    }, 500);
                }

                return novoSaldo;
            });

            // Finaliza o giro e limpa a aposta
            setGirando(false);
            setAposta("");
        }, 1500);
    };

    // Função para reiniciar o jogo
    const recomecar = () => {
        setSaldo(10);
        setMensagem("✅ Jogo reiniciado!");
        setRoleta(["❓", "❓", "❓"]);
    };

    // Função para parar o jogo e exibir o saldo
    const parar = () => {
        alert(`Você parou com R$ ${saldo.toFixed(2)}`);
        recomecar();
    };

    // Retorno JSX que renderiza a interface do jogo
    return (
        <main className="h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] font-[Arial] text-white flex flex-col items-center justify-center text-center px-4">

            {/* Botão para voltar à página anterior */}
            <Link
                href="/"
                className="absolute top-4 left-4 px-4 py-2 rounded-full text-lg font-bold bg-gradient-to-r from-[#00c6ff] to-[#0072ff] hover:scale-103 hover:shadow-[0_0_10px_#00c6ff] transition"
            >
                ← Voltar
            </Link>

            {/* Título do jogo */}
            <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent p-2 bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-600 text-center drop-shadow-lg">
                Caça Niquel
            </h1>

            {/* Exibição do saldo */}
            <div className="my-4 text-2xl text-[#00ffcc] drop-shadow-[0_0_10px_#00ffaa]">
                Saldo acumulado: R$ {saldo.toFixed(2)}
            </div>

            {/* Botões de aposta */}
            <div className="flex flex-wrap gap-4 p-6">
                {/* Cada botão representa um valor fixo de aposta */}
                <button
                    onClick={() => setAposta(1)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    1 R$
                </button>

                <button
                    onClick={() => setAposta(3)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 3 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    3 R$
                </button>

                <button
                    onClick={() => setAposta(5)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 5 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    5 R$
                </button>

                <button
                    onClick={() => setAposta(10)}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 10 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    10 R$
                </button>

                <button
                    onClick={() => setAposta(50)}
                    disabled={saldo < 50}
                    className={`px-2 py-1 rounded-2xl text-white transition-all duration-300
                    ${saldo < 50 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] hover:scale-105 hover:shadow-[0_0_20px_#2563eb]'}`}
                >
                    50 R$
                </button>
            </div>

            {/* Campo de input da aposta */}
            <input
                readOnly // Desabilitado, pois o input é apenas informativo
                type="number"
                min={1}
                placeholder="Aposte aqui"
                value={aposta}
                onChange={(e) => setAposta(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="px-4 py-2 w-[160px] rounded-xl border border-white/30 bg-white/10 text-white mt-4 text-center text-base backdrop-blur-sm placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#00ffcc]"
            />

            {/* Slots da roleta */}
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

            {/* Botão para girar */}
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

            {/* Botão para parar e encerrar a partida */}
            <div className="mb-6">
                <button
                    onClick={parar}
                    className="px-6 py-3 mt-2 text-lg font-bold rounded-xl bg-gradient-to-r from-[#ff512f] to-[#dd2476] shadow-lg transition-all duration-300 hover:scale-103 hover:shadow-[0_0_10px_#ff512f]"
                >
                    Parar com o saldo atual
                </button>
            </div>

            {/* Exibição das mensagens (vitória, derrota, alerta) */}
            <div className="mt-2 text-xl drop-shadow-[0_0_10px_rgba(0,0,0,0.7)] min-h-[1.5em]">
                {mensagem}
            </div>
        </main>
    );
}
