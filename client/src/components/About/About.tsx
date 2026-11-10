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
        © TripleTen, desarrollado por mí, Víctor Sánchez. En este proyecto se
        utilizaron herramientas de desarrollo, comenzando con HTML, JavaScript,
        TypeScript y CSS. También herramientas actuales como React + Vite que
        nos permiten crear aplicaciones modernas y de manera rápida en la parte
        de frontend. Además, se usará Express.js en la próxima etapa para
        entornos de trabajo del lado del backend. Aplicando lo aprendido sobre
        todas estas para lograr mostrar esta aplicación que sea amigable para
        quien interactúe con ella.
      </p>
      <p className="about__info">
        Es una página que consume la API sobre Pokémon (PokeAPI) la cual da
        datos sobre cada Pokémon, en este caso utilizando su id, nombre, la
        imagen y el tipo o tipos de cada uno. Mostrando por bloques de 20, con
        la capacidad de recorrer todos, buscando alguno en específico y con la
        opción de agregar favoritos. Y donde puedes ver tus favoritos
        presionando el botón con ese nombre.
      </p>
      <div className="about__texts-container">
        <p className="about__text">
          <img className="about__image-icon" src={html} alt="HTML icon" />
          HTML en este proyecto, al utilizar React funciona como "lienzo",
          conectado mediante {"<script></script>"} para dibujar el diseño que se
          le dio a la aplicación.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={js} alt="Javascript icon" />
          JavaScript es la base que se utilizó para darle las funcionalidades y
          la interacción necesaria a la aplicación, para poder obtener y mostrar
          las tarjetas y demás recursos de esta pero, como dije, es la base; no
          se utilizó directamente JS.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={ts} alt="Typescript icon" />
          TypeScript es una "extensión" de JS, la cual permite ir estructurando
          las clases y funciones respecto a lo que necesitamos, dando la forma
          de los objetos, principalmente las tarjetas, lo cual permitió tener
          control sobre lo que se obtuvo de API (id, nombre, imagen, tipo), esto
          gracias a su sistema de tipado que permite detectar errores en tiempo
          real y permitiendo corregirlos, para facilitar la implementación y
          corregir los errores que se presentaron.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={css} alt="css icon" />
          CSS es la herramienta utilizada para dar estilo a la página y sus
          componentes, utilizando para ello las clases asignadas en los
          componentes correspondientes, lo cual permitió darle forma a la página
          completa, cada sección, tarjetas y botones. Agrupándolos, dando el
          espacio adecuado y también permitiendo ajustar a diferentes
          resoluciones de pantalla para diferentes dispositivos.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={react} alt="react icon" />
          React es la base con la que se trabajó para crear la aplicación. Aquí
          es donde se construyó cada componente y con el que maquetó la
          estructura de la aplicación, ya que al "combinar" HTML y JS/TS permite
          crear los diferentes elementos que se muestran de la página asignando
          las clases, y teniendo un comportamiento dinámico que le permite
          también mostrar propiedades de cada componente dependiendo de la
          interacción del usuario.
        </p>
        <p className="about__text">
          <img className="about__image-icon" src={vite} alt="vite icon" />
          Vite es la herramienta que al igual que React, se usa en frontend,
          pero su función es la que permite, mediante módulos ES, arrancar de
          manera más rápida y se encarga de empaquetar el código para
          producción.
        </p>
      </div>
    </>
  );
}

export default About;
