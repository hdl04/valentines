document.addEventListener("DOMContentLoaded", () => {
  const langSelector = document.getElementById("language-selector");
  const elements = document.querySelectorAll("[data-i18n]");

  function translate(lang) {
    fetch(`${lang}.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Arquivo de idioma ${lang}.json não encontrado.`);
        }
        return res.json();
      })
      .then((data) => {
        elements.forEach((el) => {
          const key = el.getAttribute("data-i18n");
          const text = key.split(".").reduce((obj, k) => obj?.[k], data);
          if (text) {
            el.textContent = text;
          }
        });
      })
      .catch((error) => {
        console.error("Erro ao carregar idioma:", error);
      });
  }

  if (langSelector) {
    langSelector.addEventListener("change", (e) => {
      translate(e.target.value);
      localStorage.setItem("idioma", e.target.value);
      location.reload();
    });
  }

  const idiomaSalvo = localStorage.getItem("idioma");
  if (langSelector) {
    langSelector.value = idiomaSalvo;
  }
  translate(idiomaSalvo);

  const h2 = document.getElementById("h2texto");
  const p = document.getElementById("p-apresentacao");

  function digitacao(texto, contador) {
    if (contador < texto.length) {
      setTimeout(() => {
        h2.textContent += texto.charAt(contador);
        contador++;

        digitacao(texto, contador);
      }, 130);
    }
  }

  let mensagem1 = "";
  let mensagem2 = "";

  switch (idiomaSalvo) {
    case "pt":
      mensagem1 = "Olá, minha princesinha!";
      mensagem2 =
        "Como você está meu amor? Va bene? Então, esse é meu presentinho para você, resolvi contar um pouquinho de como foi nossa história pelo o meu lado e criei um lugarzinho onde só a gente vai ter acesso para eternizar nossos momentos, as cartinhas, as viagens que ainda faremos, nossa galeria para encher de fotos. Fiz com todo carinho do mundo para ti! Espero que goste. Eu te amo para sempre!";
      break;
    case "en":
      mensagem1 = "Hello, my little princess!";
      mensagem2 =
        "How are you my love? Are you okay? So, this is my little gift for you, I decided to tell you a little bit about our story from my side and I created a little place where only we will have access to immortalize our moments, the letters, the trips we will still take, our gallery to fill with photos. I made it with all the love in the world for you! I hope you like it. I love you forever!";
      break;
    case "it":
      mensagem1 = "Ciao, mia piccola principessa!";
      mensagem2 =
        "Come stai amore mio? Va bene? Allora, questo è il mio piccolo regalo per te, ho deciso di raccontarti un po' della nostra storia da parte mia e ho creato un piccolo spazio dove solo noi avremo accesso per immortalare i nostri momenti, le lettere, i viaggi che faremo ancora, la nostra galleria fotografica da riempire. L'ho fatto con tutto l'amore del mondo per te! Spero che ti piaccia. Ti amerò per sempre!";
      break;
    case "es":
      mensagem1 = "¡Hola, mi princesita!";
      mensagem2 =
        "¿Cómo estás, mi amor? ¿Estás bien? Este es mi pequeño regalo para ti. Decidí contarte un poco de nuestra historia desde mi perspectiva y creé un pequeño espacio al que solo nosotros tendremos acceso para inmortalizar nuestros momentos, las cartas, los viajes que aún hacemos, nuestra galería para llenar de fotos. ¡Lo hice con todo el amor del mundo para ti! Espero que te guste. ¡Te amo por siempre!";
      break;
    default:
      mensagem1 = "Bonjour, ma petite princesse!";
      mensagem2 =
        "Comment vas-tu, mon amour ? Tu vas bien ? Alors, voici mon petit cadeau pour toi. J'ai décidé de te raconter un peu notre histoire de mon point de vue et j'ai créé un petit espace où nous seuls aurons accès pour immortaliser nos moments, les lettres, les voyages que nous ferons encore, notre galerie de photos. Je l'ai fait avec tout mon amour pour toi ! J'espère que ça te plaira. Je t'aime pour toujours !";
  }
  function digitacaop(texto, contador) {
    setTimeout(() => {
      p.textContent += texto.charAt(contador);
      contador++;

      digitacaop(texto, contador);
    }, 70);
  }
  digitacao(mensagem1, 0);

  setTimeout(() => {
    digitacaop(mensagem2, 0);
  }, 3200);
});
