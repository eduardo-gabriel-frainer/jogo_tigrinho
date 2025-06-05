"use client"; // Indica que este componente será renderizado no cliente (browser)

import Image from "next/image"; // Importa o componente otimizado de imagens do Next.js
import Link from "next/link";   // Importa o componente de link do Next.js para navegação interna

export default function Home() {
  return (
    <div
      className="h-screen bg-gradient-to-b from-[#0a0f1c] via-[#101b30] to-[#162a4f] p-8 sm:p-16 
                 flex flex-col justify-center items-center gap-10 text-center"
    >
      {/* Título principal com texto grande, negrito, gradiente de cor e sombra */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent p-2 bg-clip-text 
                     bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-600 
                     text-center drop-shadow-lg">
        Jogo do Tigrinho
      </h1>

      {/* Parágrafo explicativo com texto cinza claro e largura máxima */}
      <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl">
        Escolha um dos jogos abaixo e embarque na sua aventura com o bichinho da sorte!
      </p>

      {/* Container para os cards dos jogos, layout responsivo em grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-3xl">

        {/* Card do jogo Roleta */}
        <div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl 
                     p-6 flex flex-col items-center gap-6 transform hover:scale-105 
                     transition duration-300"
        >
          {/* Imagem do jogo Roleta com cantos arredondados */}
          <Image
            src="/RoletaIcone.png"
            alt="Jogo da Roleta"
            width={400}
            height={150}
            className="rounded-2xl"
          />
          {/* Título do card */}
          <h2 className="text-3xl font-bold text-orange-400">Jogo da Roleta</h2>
          {/* Descrição curta */}
          <p className="text-gray-300">
            Tente a sorte e gire a Roleta da felicidade!
          </p>
          {/* Botão que leva para a página do jogo Roleta */}
          <Link
            href="/Roleta"
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 
                       hover:to-orange-700 text-white font-semibold py-2 px-8 rounded-full 
                       shadow-lg transition-all duration-300"
          >
            Jogar agora
          </Link>
        </div>

        {/* Card do jogo Campo Minado */}
        <div
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl 
                     p-6 flex flex-col items-center gap-6 transform hover:scale-105 
                     transition duration-300"
        >
          {/* Imagem do jogo Campo Minado */}
          <Image
            src="/MinadoIcone.png"
            alt="Campo Minado"
            width={400}
            height={150}
            className="rounded-2xl"
          />
          {/* Título do card */}
          <h2 className="text-3xl font-bold text-purple-400">Campo Minado</h2>
          {/* Descrição curta */}
          <p className="text-gray-300">
            Se aventure em um tabuleiro!
          </p>
          {/* Botão que leva para a página do Campo Minado */}
          <Link
            href="/CampoMinado"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 
                       hover:to-purple-700 text-white font-semibold py-2 px-8 rounded-full 
                       shadow-lg transition-all duration-300"
          >
            Jogar agora
          </Link>
        </div>
      </div>
    </div>
  );
}
