import React from 'react';
import Image from "next/image";

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Cei mai folosiți termeni în magazin și semnificația lor</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tip Suport Perdele: Sina vs. Galerie</h2>
        <p>
          Sina și galeria sunt două tipuri comune de suporturi pentru perdele.
          Sina oferă o opțiune elegantă și discretă, în timp ce galeria poate adăuga
          o notă artistică și permite schimbarea ușoară a perdelelor.
        </p>
        <div className="grid grid-cols-2 gap-8 h-500">
          <div className=" rounded-2xl overflow-hidden h-480">
              <Image 
              src="/images/sina1.jpg" 
              alt="hero2" 
              width={300} 
              height={300}
              className="img scale-animation"
              />
          </div>

          <div className="rounded-2xl overflow-hidden ">
              <Image 
              src="/images/galerie.jpg" 
              alt="hero3" 
              width={300} 
              height={300}
              className="img scale-animation"
              />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tip Prindere Perdele: Rejansa vs. Inele</h2>
        <p>
          Alegerea între rejansa și inele depinde de preferințele estetice și
          de design. Rejansa poate oferi un aspect clasic și elegant, în timp ce
          inelele pot adăuga un element modern și facilitează manipularea perdelelor.
        </p>
        <div className="grid grid-cols-2 gap-10 h-300 ">
          <div className="rounded-2xl overflow-hidden h-200">
              <Image 
              src="/images/rejansa.jpg" 
              alt="hero2" 
              width={300} 
              height={300}
              className="img scale-animation"
              />
          </div>

          <div className="rounded-2xl overflow-hidden ">
              <Image 
              src="/images/inele.jpg" 
              alt="hero3" 
              width={300} 
              height={300}
              className="img scale-animation"
              />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Modalitate de Instalare a Suporturilor de Perdele</h2>
        <p>
          Instalarea suporturilor de perdele poate varia în funcție de tipul
          suportului ales. Asigurați-vă că urmați instrucțiunile furnizate de
          producător pentru a asigura o instalare corectă și sigură.
        </p>
      </section>

      {/* Alte secțiuni ale blogului pot fi adăugate aici */}
    </div>
  );
};

export default BlogPage;