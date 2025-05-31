import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1c] via-[#101b30] to-[#162a4f] p-8 sm:p-16 flex flex-col items-center gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 text-center">
        🐯 Bem-vindo ao Jogo do Tigrinho!
      </h1>

      <p className="text-lg sm:text-xl text-gray-400 text-center max-w-2xl">
        Escolha um dos jogos abaixo para começar sua aventura com o tigrinho da sorte!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-4">
          <Image
            src="/RoletaIcone.png"
            alt="Jogo da Roleta"
            width={400}
            height={150}
            className="rounded-xl"
          />
          <h2 className="text-2xl font-semibold text-orange-700">Jogo da Roleta</h2>
          <p className="text-gray-600 text-center">
            Tente a sorte e gire a Roleta da felicidade!!!
          </p>
          <Link
            href="/Roleta"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            Jogar agora
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center gap-4">
          <Image
            src="/MinadoIcone.png"
            alt="Campo Minado"
            width={400}
            height={150}
            className="rounded-xl"
          />
          <h2 className="text-2xl font-semibold text-purple-700">Campo Minado</h2>
          <p className="text-gray-600 text-center">
            Se aventure em um tabuleiro onde existe 5 bombas escondidas
          </p>
          <Link
            href="/CampoMinado"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            Jogar agora
          </Link>
        </div>
      </div>
    </div>
  );
}
