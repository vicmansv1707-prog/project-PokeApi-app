import express from "../../images/express.png";
import html from "../../images/html_image.png";
import js from "../../images/js_image.png";
import ts from "../../images/typescript.png";
import css from "../../images/css_image.png";
import react from "../../images/React_image.png";
import vite from "../../images/vite.png";

function About(): React.JSX.Element {
  return (
    <>
      <h1 className="about">Sobre el autor</h1>
      <p className="about__info">
        Proyecto final del bootcamp Desarrollador Web impartido en la plataforma
        © TripleTen, desarrollado por mi Víctor Sánchez. En este proyecto se
        utilizaron herramientas de desarrollo comenzando con HTML, JavaScrip,
        TypeScript y CSS. También herramientas actuales como Reat - Vite que nos
        permiten crear aplicaciones modernas y de manera rápida en la parte de
        frontend. Además de Express.js para entornos de trabajo del lado del
        backend. Aplicando lo aprendido sobre todas estas para lograr mostrar
        esta aplicación que sea amigable para quién interactue con ella.
      </p>
      <p className="about__info">
        Es un página que consume la API sobre Pokémon (PokeAPI) la cual da datos
        sobre cada pokémon, en este caso utilizando su id, nombre, la imagen y
        el tipo o tipos de cada uno. Mostrando por bloques de 20, con la
        capacidad de recorrer todos, bucando alguno en específico y con la
        opición de agregar favoritos. Y donde puedes ver tus favoritos
        presionando el botón con ese nombre.
      </p>
      <div className="about__texts-cointainer">
        <p className="about__text">
          <img className="about__image-icon" src={html} alt="HTML icon" />
          HTML (Lenguaje de Marcado de Hipertexto) es el código estándar para
          crear y estructurar páginas web. Usa etiquetas para organizar textos,
          imágenes, enlaces y tablas, y funciona como el esqueleto del sitio, el
          cual se complementa con CSS para el diseño y JavaScript para la
          interactividad.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={js} alt="Javascript icon" />
          JavaScript (conocido comúnmente como JS) es un lenguaje de
          programación interpretado, ligero y de alto nivel que se utiliza
          principalmente para dar interactividad, dinamismo y lógica a las
          páginas web. Junto con HTML (estructura) y CSS (diseño visual), es una
          de las tres tecnologías principales de la World Wide Web.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={ts} alt="Typescript icon" />
          TypeScript es un lenguaje de programación de tipado estricto basado en
          JavaScript. Los desarrolladores le han agregado características
          adicionales, como tipado estático, clases y módulos, para crear
          programas más confiables y mantenibles. TypeScript permite detectar
          errores en tiempo de desarrollo, facilita el trabajo en equipo y
          mejora la productividad en proyectos grandes. Se compila a JavaScript
          estándar, por lo que el código escrito en TypeScript puede ejecutarse
          en cualquier navegador moderno o entorno que admita JavaScript.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={css} alt="css icon" />
          CSS (Cascading Style Sheets) es un estándar que define cómo se
          presentan los datos en el navegador. El objetivo principal del
          desarrollo de CSS es separar el contenido, ya sea escrito en HTML u
          otro lenguaje de marcado, del diseño de un documento. Esta separación
          puede aumentar la accesibilidad de los documentos, proporcionar mayor
          flexibilidad y control sobre su presentación, así como reducir la
          complejidad y la repetición de los contenidos estructurados.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={react} alt="react icon" />
          React (o React.js) es una biblioteca de JavaScript de código abierto
          creada por Meta (Facebook) para construir interfaces de usuario (UI)
          en el frontend. Se usa para desarrollar aplicaciones web dinámicas y
          de una sola página (SPA) de forma rápida y modular.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={vite} alt="vite icon" />
          Vite es una herramienta de compilación y servidor de desarrollo para
          frontend diseñada para acelerar la creación de aplicaciones web
          modernas. Creado por Evan You (también autor de Vue.js), su nombre
          significa "rápido" en francés.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={express} alt="Express icon" />
          Express (o simplemente Express) es un entorno de trabajo (framework)
          de código abierto para Node.js, diseñado para crear aplicaciones web y
          APIs del lado del servidor de forma rápida y sencilla.
        </p>
      </div>
    </>
  );
}

export default About;
