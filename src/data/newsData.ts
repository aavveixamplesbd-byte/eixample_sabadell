export interface Article {
  id: number;
  title: Record<"ca" | "es", string>;
  category: Record<"ca" | "es", string>;
  date: string; // ISO date string for sorting
  readTime: Record<"ca" | "es", string>;
  image: string;
  description: Record<"ca" | "es", string>;
  alt: Record<"ca" | "es", string>;
  slug: Record<"ca" | "es", string>;
  content: Record<"ca" | "es", string[]>;
  featured?: boolean; // Flag to highlight an article at the top of the news portal
}

export const newsArticles: Article[] = [
  {
    id: 15,
    title: {
      ca: "El Casal Pere Quart programa una quinzena d'espectacles de proximitat al juny: una oportunitat per al veïnat de l'Eixample",
      es: "El Casal Pere Quart programa una quincena de espectáculos de proximidad en junio: una oportunidad para el vecindario del Eixample"
    },
    category: {
      ca: "Cultura",
      es: "Cultura"
    },
    date: "2026-06-04",
    readTime: {
      ca: "3 min de lectura",
      es: "3 min de lectura"
    },
    image: "https://web.sabadell.cat/images/nadal/joves.jpg",
    description: {
      ca: "El Casal Pere Quart ofereix una àmplia programació cultural per al juny de 2026, amb teatre, música i espectacles familiars. Des de l'AVES valorem molt positivament l'oferta de proximitat, especialment per al veïnat de l'Eixample, que té aquest equipament a pocs minuts a peu.",
      es: "El Casal Pere Quart ofrece una amplia programación cultural para junio de 2026, con teatro, música y espectáculos familiares. Desde la AVES valoramos muy positivamente la oferta de proximidad, especialmente para el vecindario del Eixample, que tiene este equipamiento a pocos minutos a pie."
    },
    alt: {
      ca: "Fotografia de l'edifici del Casal Pere Quart, equipament cultural de Sabadell",
      es: "Fotografía del edificio del Casal Pere Quart, equipamiento cultural de Sabadell"
    },
    slug: {
      ca: "casal-pere-quart-programa-quinzena-espectacles-proximitat-juny-oportunitat-veinat-eixample",
      es: "casal-pere-quart-programa-quincena-espectaculos-proximidad-junio-oportunidad-vecindario-eixample"
    },
    content: {
      ca: [
        "El Casal Pere Quart, situat al centre de Sabadell, presenta una programació vibrant per al mes de juny de 2026, amb propostes que van del teatre contemporani a la música en viu. L'equipament, gestionat per l'Ajuntament de Sabadell, s'ha consolidat com un espai de referència per a la cultura de proximitat, oferint espectacles a preus assequibles i, en molts casos, amb invitació gratuïta per a col·lectius específics.",
        "Entre els actes destacats del mes de juny, el dijous 18 de juny tindrà lloc 'Inspirazioa', amb l'Orquestra d'Acordions de Sabadell i Gorka Hermosa, una proposta musical que fusiona l'acordió amb sons contemporanis. El diumenge 21 de juny es representa 'No passareu!', una obra de teatre que rememora el tràgic desenllaç de cinc milicianes que van defensar la legalitat republicana. I el dimecres 10 de juny, de 18.30 a 20 h, se celebren les sessions de benvinguda del 2026 al Casal Pere Quart.",
        "A més, el Pati del Casal Pere Quart acollirà al llarg de l'estiu espectacles com 'Barberismes' (26 de juny), la 'Gala Lírica' (30 de juny) o el concert 'Jazz amb Històries', entre d'altres. Tota la programació es pot consultar a sabadellcultura.koobin.cat o a través de l'app Sincronitzats.",
        "Des de l'Associació de Veïns de l'Eixample Sabadell (AVES), valorem molt positivament aquesta oferta. El Casal Pere Quart es troba a pocs minuts a peu del barri de l'Eixample, cosa que el converteix en un recurs cultural especialment accessible per al nostre veïnat. Animem a tots els veïns i veïnes a aprofitar aquesta programació de qualitat, assequible i, sobretot, de proximitat. La cultura és un dret i una eina fonamental per mantenir viu el nostre barri."
      ],
      es: [
        "El Casal Pere Quart, situado en el centro de Sabadell, presenta una programación vibrante para el mes de junio de 2026, con propuestas que van del teatro contemporáneo a la música en vivo. El equipamiento, gestionado por el Ayuntamiento de Sabadell, se ha consolidado como un espacio de referencia para la cultura de proximidad, ofreciendo espectáculos a precios asequibles y, en muchos casos, con invitación gratuita para colectivos específicos.",
        "Entre los actos destacados del mes de junio, el jueves 18 de junio tendrá lugar 'Inspirazioa', con la Orquestra d'Acordions de Sabadell y Gorka Hermosa, una propuesta musical que fusiona el acordeón con sonidos contemporáneos. El domingo 21 de junio se representa 'No passareu!', una obra de teatro que rememora el trágico desenlace de cinco milicianas que defendieron la legalidad republicana. Y el miércoles 10 de junio, de 18.30 a 20 h, se celebran las sesiones de bienvenida del 2026 en el Casal Pere Quart.",
        "Además, el Pati del Casal Pere Quart acogerá a lo largo del verano espectáculos como 'Barberismes' (26 de junio), la 'Gala Lírica' (30 de junio) o el concierto 'Jazz amb Històries', entre otros. Toda la programación se puede consultar en sabadellcultura.koobin.cat o a través de la app Sincronitzats.",
        "Desde la Asociación de Vecinos del Eixample Sabadell (AVES), valoramos muy positivamente esta oferta. El Casal Pere Quart se encuentra a pocos minutos a pie del barrio del Eixample, lo que lo convierte en un recurso cultural especialmente accesible para nuestro vecindario. Animamos a todos los vecinos y vecinas a aprovechar esta programación de calidad, asequible y, sobre todo, de proximidad. La cultura es un derecho y una herramienta fundamental para mantener vivo nuestro barrio."
      ]
    }
  },
  {
    id: 14,
    title: {
      ca: "El Pati de la Filosa acull el primer cinefòrum veïnal de l'estiu",
      es: "El Pati de la Filosa acoge el primer cinefòrum vecinal del verano"
    },
    category: {
      ca: "Activitats",
      es: "Actividades"
    },
    date: "2026-06-04",
    readTime: {
      ca: "3 min de lectura",
      es: "3 min de lectura"
    },
    image: "https://web.sabadell.cat/images/nadal/joves.jpg",
    description: {
      ca: "L'AVES organitza un cicle de cinema a la fresca al parc de la Filosa, amb debat posterior. Comencem aquest divendres amb una proposta que reivindica el passat tèxtil del barri.",
      es: "La AVES organiza un ciclo de cine al aire libre en el parque de la Filosa, con debate posterior. Empezamos este viernes con una propuesta que reivindica el pasado textil del barrio."
    },
    alt: {
      ca: "Imatge del Pati de la Filosa amb cadires i pantalla de cinema a la fresca, ambientat al capvespre",
      es: "Imagen del Pati de la Filosa con sillas y pantalla de cine al aire libre, ambientado al atardecer"
    },
    slug: {
      ca: "el-pati-de-la-filosa-acull-el-primer-cineforum-veinal-de-lestiu",
      es: "el-pati-de-la-filosa-acoge-el-primer-cineforum-vecinal-del-verano"
    },
    content: {
      ca: [
        "El barri de l'Eixample Sabadell es prepara per viure un estiu de cultura de proximitat gràcies a la nova programació impulsada per l'Associació de Veïns AVES. A partir d’aquest divendres 10 de juliol, el Pati de la Filosa —aquell espai verd que tots coneixem entre l’avinguda de Barberà i el carrer de Calders— es convertirà en una sala de cinema a l’aire lliure. La primera sessió, a les 21.30 h, projectarà un documental sobre les antigues colònies tèxtils de Sabadell, amb un debat posterior conduït per historiadors locals. Una oportunitat per recordar les fàbriques de filatura que van donar vida al nostre barri.",
        "El cicle, que s'allargarà cada divendres fins a finals d'agost, combinarà pel·lícules, documentals i curts amb un marcat accent social i reivindicatiu. La proposta ha estat ben rebuda pels veïns, especialment per aquells que viuen als voltants del carrer de Brutau i la Gran Via, que podran gaudir d’una activitat cultural sense sortir del barri. L’AVES ha habilitat un espai amb cadires i coixins, i es recomana portar manta per a les nits més fresques. A més, durant les projeccions hi haurà servei de barraques gestionat per entitats locals, amb begudes i productes de comerç just.",
        "Les novetats culturals no s’aturen aquí. El Casal del Barri, al carrer de Calders, acollirà aquest dissabte 11 de juliol un taller de dansa contemporània per a totes les edats, i diumenge tindrà lloc una assemblea veïnal oberta per decidir les properes activitats de l’agenda d’estiu. Des de l’AVES animen a participar-hi: «Volem que el barri continuï sent un espai viu, de trobada i de lluita pels nostres drets», explica la seva presidenta. Per a més informació, es pot consultar el tauler d’anuncis del Casal o seguir les xarxes socials de l’associació. Un estiu més, l’Eixample Sabadell es reivindica com un barri amb identitat pròpia."
      ],
      es: [
        "El barrio del Eixample Sabadell se prepara para vivir un verano de cultura de proximidad gracias a la nueva programación impulsada por la Asociación de Vecinos AVES. A partir de este viernes 10 de julio, el Pati de la Filosa —aquel espacio verde que todos conocemos entre la avenida de Barberà y la calle de Calders— se convertirá en una sala de cine al aire libre. La primera sesión, a las 21.30 h, proyectará un documental sobre las antiguas colonias textiles de Sabadell, con un debate posterior conducido por historiadores locales. Una oportunidad para recordar las fábricas de hilatura que dieron vida a nuestro barrio.",
        "El ciclo, que se alargará cada viernes hasta finales de agosto, combinará películas, documentales y cortos con un marcado acento social y reivindicativo. La propuesta ha sido bien recibida por los vecinos, especialmente por aquellos que viven en los alrededores de la calle de Brutau y la Gran Vía, que podrán disfrutar de una actividad cultural sin salir del barrio. La AVES ha habilitado un espacio con sillas y cojines, y se recomienda traer manta para las noches más frescas. Además, durante las proyecciones habrá servicio de casetas gestionado por entidades locales, con bebidas y productos de comercio justo.",
        "Las novedades culturales no se detienen aquí. El Casal del Barrio, en la calle de Calders, acogerá este sábado 11 de julio un taller de danza contemporánea para todas las edades, y el domingo tendrá lugar una asamblea vecinal abierta para decidir las próximas actividades de la agenda de verano. Desde la AVES animan a participar: «Queremos que el barrio siga siendo un espacio vivo, de encuentro y de lucha por nuestros derechos», explica su presidenta. Para más información, se puede consultar el tablón de anuncios del Casal o seguir las redes sociales de la asociación. Un verano más, el Eixample Sabadell se reivindica como un barrio con identidad propia."
      ]
    }
  },
  {
    id: 1,
    title: {
      ca: "Digitalització de l'Arxiu Industrial: Un viatge al passat",
      es: "Digitalización del Archivo Industrial: Un viaje al pasado"
    },
    category: {
      ca: "Història",
      es: "Historia"
    },
    date: "2024-05-28",
    readTime: {
      ca: "5 min de lectura",
      es: "5 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9zDROrGCOXeqariPC6ruo2OmNmidmXakBKUdrcDETBhMFUt5QRXsbYYRlz3YyGfqIW1z6mZcLpuhV6CdYv7jmHuGsVH06ynvFaY3nFunpkw7ikF01OjSqUePMktGNPDEiO27WrIN_0T1VIWk3RjnFA2q3Ff0BT3L61zNTR1guVJWez3QH-zn4jGXjHdvXgiFX7U3omTF0vV-2HyNeKPwzosycTpBBZB4WvNx6ZT5YC4JqLCCuGPBaNeqmJ3ta6436EIm247DRlIOI",
    description: {
      ca: "Iniciem el procés de preservació digital de més de 500 documents històrics de les antigues filatures de l'Eixample.",
      es: "Iniciamos el proceso de preservación digital de más de 500 documentos históricos de las antiguas hilaturas del Eixample."
    },
    alt: {
      ca: "Arxiu Industrial digitalitzat",
      es: "Archivo Industrial digitalizado"
    },
    slug: {
      ca: "digitalitzacio-arxiu-industrial",
      es: "digitalizacion-archivo-industrial"
    },
    content: {
      ca: [
        "L'Associació de Veïns Eixample Sabadell ha iniciat un ambiciós projecte per digitalitzar la memòria obrera i industrial del nostre barri. Amb la col·laboració d'historiadors locals i la donació altruista de documents per part de famílies del barri, ens proposem catalogar i digitalitzar més de 500 arxius històrics de finals del segle XIX i principis del segle XX.",
        "Aquesta col·lecció conté plànols originals de les primeres fàbriques tèxtils, fotografies inèdites del dia a dia dels treballadors, i registres de les primeres mútues de socors mutus creades per la comunitat obrera. La preservació d'aquests materials és fonamental per mantenir la identitat col·lectiva del barri davant del creixement de la ciutat moderna.",
        "Un cop finalitzada la digitalització, tots els arxius es publicaran en un portal d'accés obert per a investigadors, estudiants i veïns curiosos. A més, es preveu organitzar una exposició física a la seu de l'associació per celebrar la inauguració de l'arxiu digital a finals d'any."
      ],
      es: [
        "La Asociación de Vecinos Eixample Sabadell ha iniciado un ambicioso proyecto para digitalizar la memoria obrera e industrial de nuestro barrio. Con la colaboración de historiadores locales y la donación altruista de documentos por parte de familias del barrio, nos proponemos catalogar y digitalizar más de 500 archivos históricos de finales del siglo XIX y principios del siglo XX.",
        "Esta colección contiene planos originales de las primeras fábricas textiles, fotografías inéditas del día a día de los trabajadores, y registros de las primeras mutuas de socorros mutuos creadas por la comunidad de obreros. La preservación de estos materiales es fundamental para mantener la identidad colectiva del barrio frente al crecimiento de la ciudad moderna.",
        "Una vez finalizar la digitalización, todos los archivos se publicarán en un portal de acceso abierto para investigadores, estudiantes y vecinos curiosos. Además, se prevé organizar una exposición física en la sede de la asociación para celebrar la inauguración del archivo digital a finales de año."
      ]
    }
  },
  {
    id: 2,
    title: {
      ca: "Assemblea de Veïns: Resultats del Pressupost Participatiu",
      es: "Asamblea de Vecinos: Resultados del Presupuesto Participativo"
    },
    category: {
      ca: "Activitats",
      es: "Actividades"
    },
    date: "2024-06-02",
    readTime: {
      ca: "3 min de lectura",
      es: "3 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfL24rhEpx0WjB2202ghb6AeITtxB6oLgjx7VvxNck-5EPrbSucmSYfH_qnEKWFRc8aUMu8wvU72xGIdPFaN3WQm8pqsnpg0dUmKo63cbnV1XZXklVTredby35m61kOu0ucndZjkt9qHSlRGKjb6fYmciBXAXsk-J0Jxq5N-wLuubr25GQG7JlxACwdQJc4jmgqGTAwcRYcP_AmLtmIX8W2x5ggZnLeEVuvFk2mx3rtVI1NgVKW6wUxHBHQY8IRGUguzwi1XZGCrNv",
    description: {
      ca: "Més de 200 veïns han votat per les millores del barri. El parc de la Filosa rebrà la inversió principal per a la nova àrea infantil.",
      es: "Más de 200 vecinos han votado por las mejoras del barrio. El parque de la Filosa recibirá la inversión principal para la nueva área infantil."
    },
    alt: {
      ca: "Assemblea de veïns participativa",
      es: "Asamblea de vecinos participativa"
    },
    slug: {
      ca: "assemblea-veins-pressupost-participatiu",
      es: "asamblea-vecinos-presupuesto-participativo"
    },
    content: {
      ca: [
        "El passat dissabte es va celebrar l'Assemblea General Extraordinària per debatre la destinació dels fons del Pressupost Participatiu d'enguany. Amb una participació històrica de més de 200 veïns i veïnes del barri, es van votar les diferents opcions recollides durant la primavera.",
        "La proposta guanyadora ha estat la renovació integral de l'àrea de jocs infantils del parc de la Filosa. Aquest projecte inclou la col·locació de gronxadors inclusius, paviment tou de seguretat absorvent d'impactes, i la creació d'una zona d'ombres amb pèrgoles de fusta.",
        "La junta directiva de l'associació traslladarà formalment el resultat de la votació a l'Ajuntament de Sabadell per agilitzar l'inici de les obres. Es preveu que la licitació del projecte es realitzi a la tardor i les obres finalitzin abans de l'inici de la campanya de primavera."
      ],
      es: [
        "El pasado sábado se celebró la Asamblea General Extraordinaria para debatir el destino de los fondos del Presupuesto Participativo de este año. Con una participación histórica de más de 200 vecinos y vecinas del barrio, se votaron las diferentes opciones recogidas durante la primavera.",
        "La propuesta ganadora ha sido la renovación integral del área de juegos infantiles del parque de la Filosa. Este proyecto incluye la colocación de columpios inclusivos, pavimento blando de seguridad absorbente de impactos, y la creación de una zona de sombras con pérgolas de madera.",
        "La junta directiva de la asociación trasladará formalmente el resultado de la votación al Ayuntamiento de Sabadell para agilizar el inicio de las obras. Se prevé que la licitación del proyecto se realice en otoño y las obras finalicen antes del inicio de la campaña de primavera."
      ]
    }
  },
  {
    id: 3,
    title: {
      ca: "Cicle de Cinema a la Fresca: Programació d'Estiu",
      es: "Ciclo de Cine al Aire Libre: Programación de Verano"
    },
    category: {
      ca: "Cultura",
      es: "Cultura"
    },
    date: "2024-06-10",
    readTime: {
      ca: "2 min de lectura",
      es: "2 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAR1PrYMyEtPVj-zPmZkCDNCw3ZIRFI7ze8EB_8SzKCu1672QzKLjrj0zsBVwNOF1YuOn6VnBwsyR4vrdBuHqnJubrV0VofkSx1S_9tLHUfk9ioGx1NfPhS2QD5dqGME4yEcVfSaANAxICS-N6t1GDTo6LmEvS3KLufSvxMYcbdugwaRjo80SPqkyvC1O1sJ4SzFJK1JLnWeyYkIjNE5fgCfBO6wOadnIYhZC6WH4aUtVejlgX0Srjs7L8fdrtdT22TwMTIt3twTZzd",
    description: {
      ca: "Torna el cinema al pati de la fàbrica. Enguany, el cicle se centra en documentals sobre transformació urbana i art social.",
      es: "Vuelve el cine al patio de la fábrica. Este año, el ciclo se centra en documentales sobre transformación urbana y arte social."
    },
    alt: {
      ca: "Cine exterior estiu",
      es: "Cine exterior verano"
    },
    slug: {
      ca: "cinema-a-la-fresca-programacio-estiu",
      es: "cine-al-aire-libre-programacion-verano"
    },
    content: {
      ca: [
        "Un any més, l'Associació de Veïns obre les portes del pati de l'antiga fàbrica tèxtil de l'Eixample per acollir una nova edició del Cicle de Cinema a la Fresca. Les projeccions es realitzaran tots els divendres de juliol a partir de les 22:00 hores.",
        "La temàtica d'enguany gira entorn de la sostenibilitat, les lluites veïnals i la reconversió d'espais industrials a Europa. Cada sessió comptarà amb una petita presentació per part dels creadors o especialistes en l'àmbit social.",
        "L'entrada és lliure i gratuïta per a tots els residents. Comptarem amb servei de refrescos i crispetes a preus populars, els fons dels quals es destinaran a finançar l'arxiu històric del barri."
      ],
      es: [
        "Un año más, la Asociación de Vecinos abre las puertas del patio de la antigua fábrica textil del Eixample para acoger una nueva edición del Ciclo de Cine al Aire Libre. Las proyecciones se realizarán todos los viernes de julio a partir de las 22:00 horas.",
        "La temática de este año gira en torno a la sostenibilidad, las luchas vecinales y la reconversión de espacios industriales en Europa. Cada sesión contará con una pequeña presentación por parte de los creadores o especialistas en el ámbito social.",
        "La entrada es libre y gratuita para todos los vecinos. Contaremos con servicio de refrescos y palomitas a precios populares, cuyos fondos se destinarán a financiar el archivo histórico del barrio."
      ]
    }
  },
  {
    id: 4,
    title: {
      ca: "Taller d'Innovació Social: Emprenent al Barri",
      es: "Taller de Innovación Social: Emprendiendo en el Barrio"
    },
    category: {
      ca: "Activitats",
      es: "Actividades"
    },
    date: "2024-06-15",
    readTime: {
      ca: "4 min de lectura",
      es: "4 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGLgJTwjvJulWLu0iZuxJJBlkvRE9j4Ci2IuwGznxsCVkGyUDGJ1OJQYs682ediEGYGX61a6tw8aVh2F6gZREOMa-CT1ccNCOAyFpSjiuPtLHo1KgBCdlYqvLOtIl1URtn2jc3BEevBwnN2hR-d24tarBSmUH3UtG0rX1-ifyi5p-Z_xXO6TXNtjZPWDh-O8GnwaggIbT8lSRwKoNSZ7F0sjm-vZ2a3lL857lhTZXUCN3ThL6TGG7R3d14h0YO3_BAg1pys71ZYAqH",
    description: {
      ca: "Obrim les inscripcions per al nou taller d'emprenedoria local destinat a joves veïns de l'Eixample.",
      es: "Abrimos las inscripciones para el nuevo taller de emprendimiento local destinado a jóvenes vecinos del Eixample."
    },
    alt: {
      ca: "Taller innovació",
      es: "Taller innovación"
    },
    slug: {
      ca: "taller-innovacio-social-emprenent",
      es: "taller-innovacion-social-emprendiendo"
    },
    content: {
      ca: [
        "Amb l'objectiu d'impulsar el teixit econòmic local i donar suport al talent jove de l'Eixample de Sabadell, neix la primera edició del programa 'Emprenent al Barri'. Un conjunt de tallers teoricopràctics dirigits a residents que vulguin desenvolupar iniciatives socials o comercials.",
        "El programa, liderat per voluntaris de la mateixa associació i professionals en actiu, inclou formacions en disseny de models de negoci, màrqueting de proximitat, i tràmits legals per a l'obertura de petits locals o iniciatives cooperatives.",
        "Les sessions es duran a terme als locals de l'associació durant els mesos d'octubre i novembre. Les places són limitades i les inscripcions ja estan obertes a través de la nostra oficina o el correu general de la web."
      ],
      es: [
        "Con el objetivo de impulsar el tejido económico local y apoyar al talento del barrio, nace la primera edición del programa 'Emprendiendo en el Barrio'. Un conjunto de talleres teórico-prácticos dirigidos a residentes que quieran desarrollar iniciativas sociales o comerciales.",
        "El programa, liderado por voluntarios de la propia asociación y profesionales en activo, incluye formaciones en diseño de modelos de negocio, marketing de proximidad, y trámites legales para la apertura de pequeños locales o iniciativas cooperativas.",
        "Las sesiones se llevarán a cabo en los locales de la asociación durante los meses de octubre y noviembre. Las plazas son limitadas y las inscripciones ya están abiertas a través de nuestra oficina o el correo general de la web."
      ]
    }
  },
  {
    id: 5,
    title: {
      ca: "Retrats de l'Eix: Testimonis de la Sabadell tèxtil",
      es: "Retratos del Eix: Testimonios de la Sabadell textil"
    },
    category: {
      ca: "Història",
      es: "Historia"
    },
    date: "2024-06-20",
    readTime: {
      ca: "6 min de lectura",
      es: "6 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJrJHFZX1IeMjQ6Ny572w8BqWWCnks0TN0QnpDYWky7uB3i7CL4MoMlPTQVXi6xuBAWxfhNSJZyxDJVAc4a4jku02dsmv354gkMIL9LS_IQfhOvbLo9q6E_H4XQWDWUYigJwltwz_-DeuXq2a_6KwjDKRXW12MnZR50T-gxOGz1PkLM_DlGcWwUomnueuEXGyDYSENGm85Evao0oM5TXcqtSgLRhfpuux9jin3YwsnTMv_ZKKGkCzy-GiJhNUg2N-cS3IXcRYxxuwd",
    description: {
      ca: "Una nova exposició fotogràfica recull les històries dels antics treballadors i treballadores de les fàbriques del barri.",
      es: "Una nueva exposición fotográfica recoge las historias de los antiguos trabajadores y trabajadoras de las fábricas del barrio."
    },
    alt: {
      ca: "Artesà taller Sabadell",
      es: "Artesano taller Sabadell"
    },
    slug: {
      ca: "retrats-eix-testimonis-sabadell-textil",
      es: "retratos-eix-testimonios-sabadell-textil"
    },
    content: {
      ca: [
        "El passat històric de Sabadell està estretament lligat a l'esforç humà que s'amagava darrere dels murs de les grans fàbriques de teixits. Per homenatjar aquelles generacions, l'associació organitza 'Retrats de l'Eix', un projecte de memòria històrica oral i fotogràfica.",
        "La mostra es compon de més de 30 retrats contemporanis d'antics operaris, filadores i mecànics del barri, acompanyats dels seus relats personals sobre les condicions de treball, la solidaritat veïnal de l'època i la posterior reconversió de la zona.",
        "L'exposició estarà oberta al públic general de forma gratuïta al llarg de tot el mes de setembre. Us convidem a venir i reviure la història industrial a través de la mirada dels seus autèntics protagonistes."
      ],
      es: [
        "El pasado histórico de Sabadell está estrechamente ligado al esfuerzo humano que se escondía detrás de los muros de las grandes fábricas de tejidos. Para homenajear a aquellas generaciones, la asociación organiza 'Retratos del Eix', un proyecto de memoria histórica oral y fotográfica.",
        "La muestra se compone de más de 30 retratos contemporáneos de antiguos operarios, hilanderas y mecánicos del barrio, acompañados de sus relatos personales sobre las condiciones de trabajo, la solidaridad vecinal de la época y la posterior reconversión de la zona.",
        "La exposición estará abierta al público general de forma gratuita a lo largo de todo el mes de septiembre. Os invitamos a venir y revivir la historia industrial a través de la mirada de sus auténticos protagonistas."
      ]
    }
  },
  {
    id: 6,
    title: {
      ca: "Nova il·luminació LED: Més seguretat i eficiència",
      es: "Nueva iluminación LED: Más seguridad y eficiencia"
    },
    category: {
      ca: "Urbanisme",
      es: "Urbanismo"
    },
    date: "2024-06-25",
    readTime: {
      ca: "2 min de lectura",
      es: "2 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuChm6osAFnZ6kNrAs3-3LAzHMKlYcI65vpb458dqFVgOPyU-zSjOmmzGrpJIkBrfvhk0Oh_1WUqDzRPcWK6u8BE0KdD8V4PFpkdzoggjTwHCz8o2yzR17ENHIWEQF9XomdIV1H0wO5chOjHKKySdAj6jjgHzlsU35rM7EdwuNl9TOeye3_qAAqNQOoSEotFEfz3T6ngMN6v8hTaXaYuBtz8js7Q8EKjEP7buBHZ3Py5QXPe-NsT2mD2Q4EX4gxhi7O5omO0Rf-hYqhI",
    description: {
      ca: "S'ha completat la instal·lació dels nous fanals LED intel·ligents a tot el perímetre del barri, reduint el consum un 40%.",
      es: "Se ha completado la instalación de las nuevas farolas LED inteligentes en todo el perímetro del barrio, reduciendo el consumo un 40%."
    },
    alt: {
      ca: "Parc urbà modernitzat",
      es: "Parque urbano modernizado"
    },
    slug: {
      ca: "nova-il-luminacio-led-seguretat-eficiencia",
      es: "nueva-iluminacion-led-seguridad-eficiencia"
    },
    content: {
      ca: [
        "L'Ajuntament de Sabadell ha culminat la primera fase de renovació de l'enllumenat públic del barri amb la col·locació de fanals amb tecnologia LED d'alta eficiència als carrers principals de l'Eixample.",
        "Aquesta intervenció permet millorar de forma significativa la sensació de seguretat dels vianants gràcies a una distribució més uniforme de la llum. A més, els nous equips compten amb regulació horària de potència per reduir la contaminació lumínica i el consum energètic.",
        "Segons les dades facilitades pels enginyers municipals, el nou enllumenat suposarà un estalvi equivalent al 40% del consum elèctric del barri, contribuint així als objectius de transició ecològica de la ciutat."
      ],
      es: [
        "El Ayuntamiento de Sabadell ha culminado la primera fase de renovación del alumbrado público del barrio con la colocación de farolas con tecnología LED de alta eficiencia en las calles principales del Eixample.",
        "Esta intervención permite mejorar de forma significativa la sensación de seguridad de los peatones gracias a una distribución más uniforme de la luz. Además, los nuevos equipos cuentan con regulación horaria de potencia para reducir la contaminación lumínica y el consumo energético.",
        "Según los datos facilitados por los ingenieros municipales, el nuevo alumbrado supondrá un ahorro equivalente al 40% del consumo eléctrico del barrio, contribuyendo así a los objetivos de transición ecológica de la ciudad."
      ]
    }
  },
  {
    id: 7,
    title: {
      ca: "Festa Major del Barri: Recollida de propostes",
      es: "Fiesta Mayor del Barrio: Recogida de propuestas"
    },
    category: {
      ca: "Cultura",
      es: "Cultura"
    },
    date: "2024-06-28",
    readTime: {
      ca: "3 min de lectura",
      es: "3 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHwDK3L_fxD1B26aiXJ523a0w-Xml9DYLrJtoas-okWC2kGQtHfXZyKA1x0UNtflX9bKMIM0JFw5ctT1VBMr29TtKxKl8qWYcFz-_TS35_Dv8h3OkqrbLf8-WLwWmqPKnqIxq5DA6wPqtbZTmehfck4CyWtmXPbtZQv1i5BZ4FAnD4IxiRwQIiBhjV2cP1zerFqBoD0tgZv0Kzf-glHXjlDFktjAc6HgZcQS2AZvwxdwC0vx1pT9qc-UD7uZEB9Ry7JAlnVTy8tRqG",
    description: {
      ca: "Volem que la festa d'enguany sigui més participativa que mai. T'esperem el proper dimarts.",
      es: "Queremos que la fiesta de este año sea más participativa que nunca. Te esperamos el próximo martes."
    },
    alt: {
      ca: "Festa Major del Barri",
      es: "Fiesta Mayor del Barrio"
    },
    slug: {
      ca: "festa-major-barri-recollida-propostes",
      es: "fiesta-mayor-barrio-recogida-propuestas"
    },
    content: {
      ca: [
        "La comissió organitzadora de la Festa Major de l'Eixample obre el termini per a la recepció de propostes ciutadanes. Volem que la festa d'enguany respongui als interessos i preferències de tots els grups d'edat del barri.",
        "Es podran presentar projectes i idees per a concerts, jocs infantils tradicional, sopars comunitaris a la fresca, i activitats culturals diverses fins al proper 15 de juliol a la bústia de la seu veïnal.",
        "Posteriorment es realitzarà una assemblea oberta per votar les idees finalistes i planificar l'organització dels voluntaris necessaris per dur a terme cadascun dels actes de la celebració."
      ],
      es: [
        "La comisión organizadora de la Fiesta Mayor del Eixample abre el plazo para la recepción de propuestas ciudadanas. Queremos que la fiesta de este año responda a los intereses y preferencias de todos los grupos de edad del barrio.",
        "Se podrán presentar proyectos e ideas para conciertos, juegos infantiles tradicionales, cenas comunitarias al aire libre, y actividades culturales diversas hasta el próximo 15 de julio en el buzón de la sede vecinal.",
        "Posteriormente se realizará una asamblea abierta para votar las ideas finalistas y planificar la organización de los voluntarios necesarios para llevar a cabo cada uno de los actos de la celebración."
      ]
    }
  },
  {
    id: 8,
    title: {
      ca: "Nou projecte de pacificació de l'Indústria",
      es: "Nuevo proyecto de pacificación de la calle Indústria"
    },
    category: {
      ca: "Urbanisme",
      es: "Urbanismo"
    },
    date: "2024-07-02",
    readTime: {
      ca: "4 min de lectura",
      es: "4 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkk8ItTgq0dk_xyXO89z1IV2EKfhnt5kjn_Y_wx-1WLIK_xykvsrxO3EzToh1bXwY3t2IW_O-HN9e3CQn-Wl0lgmYFU48a0w-oh_EZe7J1jDWG2sAuCPJkPfL00but3uBiZSsyowBWzJCZd6pPIf-SA-XFv8hsBWQpRYwYcvvbEhEqRUA5BINM_F8zavkdBGNOzQ7QyQZlzGIG5Ml3xDbfPLKroq2m9jol1-7hfym5psUdLoM2x-JmJLxSQCuz72oU8fOr5RqPuGIH",
    description: {
      ca: "L'ajuntament presenta el pla per ampliar les zones de vianants i millorar la qualitat de l'aire.",
      es: "El ayuntamiento presenta el plan para ampliar las zonas peatonales y mejorar la calidad del aire."
    },
    alt: {
      ca: "Projecte de Pacificació",
      es: "Proyecto de Pacificación"
    },
    slug: {
      ca: "nou-projecte-pacificacio-carrer-industria",
      es: "nuevo-proyecto-pacificacion-calle-industria"
    },
    content: {
      ca: [
        "El Consistori ha fait públic el disseny executiu per pacificar un dels carrers amb més circulació del barri. El projecte busca crear espais públics més amables per als vianants i pacificar el trànsit rodat.",
        "La intervenció contempla l'ampliació de les voreres, la col·locació de mobiliari urbà de fusta i zones enjardinades amb arbrat d'ombra. També es reduirà la velocitat màxima permesa a 20 km/h en tot el tram.",
        "Es farà una sessió informativa el proper dimarts al Casal per resoldre els dubtes sobre els terminis de les obres, així com la reordenació dels espais d'aparcament afectats a la zona."
      ],
      es: [
        "El Consistorio ha hecho público el diseño ejecutivo para pacificar una de las calles con más circulación del barrio. El proyecto busca crear espacios públicos más amables para los peatones y pacificar el tráfico rodado.",
        "La intervención contempla la ampliación de las aceras, la colocación de mobiliario de madera y zonas ajardinadas con arbolado de sombra. También se reducirá la velocidad máxima permitida a 20 km/h en todo el tramo.",
        "Se hará una sesión informativa el próximo martes en el Casal para resolver las dudas sobre los plazos de las obras, así como la reordenación de los espacios de aparcamiento afectados en la zona."
      ]
    }
  },
  {
    id: 9,
    title: {
      ca: "Transformació de l'Eix: El nou pla de mobilitat per recuperar els carrers per als vianants",
      es: "Transformación del Eje: El nuevo plan de movilidad para recuperar las calles para los peatones"
    },
    category: {
      ca: "Urbanisme",
      es: "Urbanismo"
    },
    date: "2024-07-12",
    readTime: {
      ca: "4 min de lectura",
      es: "4 min de lectura"
    },
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIcULFygy1-jP3TQRS1e6kV3rF4V6P-R_eVyyW3b-YVz40GvgLQZc_krElCP4kza4ORIV3gXS52-BvPMWhaUdHzj3pPcsy6IkdLCQGRdJCuQOhED19vuKJwkBt3RgesgbIRQqPJhXPoS3TeivEL1rfv7rjPoIUcFVVm4xwjsYn2ayV3JKeAlONHl8qiRJtXzp0HPl8039PPH5Er3aDCyPnQsBjghKEKEhOwVwh52B58iFKj_6vb0P6UXXb3wprO7FghjxU1me8okom",
    description: {
      ca: "L'Ajuntament presenta el projecte final per convertir l'eix central en una zona de baixes emissions amb més espais verds i zones de convivència.",
      es: "El Ayuntamiento presenta el proyecto final para convertir el eje central en una zona de bajas emisiones con más espacios verdes y zonas de convivencia."
    },
    alt: {
      ca: "Transformació de l'Eix Central",
      es: "Transformación del Eje Central"
    },
    slug: {
      ca: "transformacio-eix-nou-pla-mobilitat",
      es: "transformacion-eje-nuevo-plan-movilidad"
    },
    content: {
      ca: [
        "El projecte estrella de remodelació de la mobilitat al barri de l'Eixample ja té llum verda definitiva. El pla municipal preveu reordenar la circulació dels carrers centrals per donar prioritat absoluta als vianants, bicicletes i transport públic, reduint el trànsit de pas de vehicles privats.",
        "Les obres, pressupostades en 1,2 milions d'euros, s'iniciaran de forma coordinada el proper mes d'octubre. El carrer principal passarà a ser de plataforma única, amb paviment continu de formigó i pedra granítica. S'eliminaran les barreres arquitectòniques actuals i s'instal·laran nous parterres amb flors i arbres autòctons.",
        "La junta directiva de l'Associació de Veïns ha valorat molt positivament que s'hagin incorporat la majoria de les esmenes presentades durant el període d'exposició pública, com la preservació del carril bici separat i la millora de la il·luminació als passos de vianants clau."
      ],
      es: [
        "El proyecto estrella de remodelación de la movilidad en el barrio del Eixample ya tiene luz verde definitiva. El plan municipal prevé reordenar la circulación de las calles centrales para dar prioridad absoluta a los peatones, bicicletas y transporte público, reduciendo el tráfico de paso de vehículos privados.",
        "Las obras, presupuestadas en 1,2 millones de euros, se iniciarán de forma coordinada el próximo mes de octubre. La calle principal pasará a ser de plataforma única, con pavimento continuo de hormigón y piedra granítica. Se eliminarán las barreras arquitectónicas actuales y se instalarán nuevos parterres con flores y árboles autóctonos.",
        "La junta directiva de la Asociación de Vecinos ha valorado muy positivamente que se hayan incorporado la mayoría de las enmiendas presentadas durante el período de exposición pública, como la preservación del carril bici separado y la mejora de la iluminación en los pasos de peatones clave."
      ]
    },
    featured: true
  },
  {
    id: 16,
    title: {
      ca: "El Caprabo històric de l'avinguda de Barberà tanca: l'Eixample perd un referent comercial",
      es: "El Caprabo histórico de la avenida de Barberà cierra: el Eixample pierde un referente comercial"
    },
    category: {
      ca: "Urbanisme",
      es: "Urbanismo"
    },
    date: "2026-06-04",
    readTime: {
      ca: "4 min de lectura",
      es: "4 min de lectura"
    },
    image: "https://www.poblesdecatalunya.cat/fotos/normal/165898.jpeg",
    description: {
      ca: "El supermercat Caprabo de l'avinguda de Barberà, ubicat a l'antiga fàbrica Molins Germans, ha iniciat la liquidació total i tancarà definitivament. L'AVES lamenta la pèrdua d'un comerç històric i reclama informació sobre el futur de l'edifici.",
      es: "El supermercado Caprabo de la avenida de Barberà, ubicado en la antigua fábrica Molins Germans, ha iniciado la liquidación total y cerrará definitivamente. La AVES lamenta la pérdida de un comercio histórico y reclama información sobre el futuro del edificio."
    },
    alt: {
      ca: "Fotografia de l'antiga fàbrica Molins Germans (Cal Molins) a l'avinguda de Barberà, on s'ubicava el Caprabo, a Sabadell. Foto: Marcos Brosel, CC BY-SA 3.0",
      es: "Fotografía de la antigua fábrica Molins Germans (Cal Molins) en la avenida de Barberà, donde se ubicaba el Caprabo, en Sabadell. Foto: Marcos Brosel, CC BY-SA 3.0"
    },
    slug: {
      ca: "caprabo-historic-avinguda-barbera-tanca-eixample-perd-referent-comercial",
      es: "caprabo-historico-avenida-barbera-cierra-eixample-pierde-referente-comercial"
    },
    content: {
      ca: [
        "El supermercat Caprabo situat al número 238 de l'avinguda de Barberà, en ple cor de l'Eixample de Sabadell, ha iniciat la liquidació total d'existències i tancarà definitivament en les properes setemes. S'apaga així un comerç que durant dècades va ser punt de trobada del barri, ubicat dins l'històric complex fabril de Cal Molins, un conjunt arquitectònic protegit construït el 1941 per l'arquitecte racionalista Santiago Casulleras, el mateix que va dissenyar l'edifici de l'Artextil, un altre emblema del patrimoni fabril de Sabadell. La decisió respon a una reordenació territorial de la cadena Caprabo, que ha prioritzat l'obertura d'un nou establiment a la plaça del Mestre, al barri de Gràcia, en detriment de la seva ubicació històrica a l'Eixample.",
        "El tancament ha generat un profund malestar entre veïns i clients habituals. Maricarmen S., clienta de tota la vida, explicava: «El tancament m'ha deixat feta pols, perquè aquest, per mi, és el millor dels tres supermercats que tinc aquí localitzats». Jessica García ho expressava amb claredat: «Està a un minut de casa, que va molt bé. Ara haurem d'anar molt més lluny per comprar quan el teníem aquí, de tota la vida». I Rosa Batlló, que acudeix cada quinze dies amb el seu pare de 96 anys, destaca la pèrdua del servei a domicili: «Seleccionaven els productes i te'ls duien a casa. Ara algunes alternatives et demanen comprar per internet, i això no és per a tothom».",
        "Des de l'Associació de Veïns de l'Eixample Sabadell (AVES), el seu president, Antonio, ha expressat la preocupació de la junta veïnal: «El tancament del Caprabo no és només la pèrdua d'un supermercat. És la pèrdua d'un punt de referència per a moltes famílies del barri. Era un comerç on la gent es coneixia, on la gent gran podia fer la compra amb la tranquil·litat de tenir un servei a domicili que funciona. És molt trist que marxen sense que sapiguem què passarà amb l'edifici».",
        "I és que el futur de l'immoble és una incògnita. La part on s'ubica la botiga és de propietat privada i, a dia d'avui, no hi ha informació pública ni plans coneguts sobre el seu destí. Això preocupa especialment l'AVES, que veu com el barri podria perdre no només un comerç de referència, sinó també part de la seva memòria històrica. El president de l'entitat afegeix: «Ningú sap què passarà amb aquest edifici. Té un valor històric inqüestionable, forma part de la memòria industrial de Sabadell, però en ser propietat privada, els veïns ens quedem a les fosques. Ens temem que acabi sent un solar en desús, o pitjor, que es perdi la seva essència. Cal Molins mereix un futur a l'altura del seu passat».",
                "Mentrestant, els veïns de l'Eixample hauran de reubicar les seves compres. L'alternativa més propera és el nou Caprabo de la plaça del Mestre, a uns deu minuts caminant, tot i que qui depenia del cotxe per a la compra setmanal o del servei a domicili per a les persones grans ho tindrà més complicat. Des de l'AVES es reivindica un model de barri que no perdi els seus serveis ni la seva memòria."
      ],
      es: [
        "El supermercado Caprabo situado en el número 238 de la avenida de Barberà, en pleno corazón del Eixample de Sabadell, ha iniciado la liquidación total de existencias y cerrará definitivamente en las próximas semanas. Se apaga así un comercio que durante décadas fue punto de encuentro del barrio, ubicado dentro del histórico complejo fabril de Cal Molins, un conjunto arquitectónico protegido construido en 1941 por el arquitecto racionalista Santiago Casulleras, el mismo que diseñó el edificio del Artextil, otro emblema del patrimonio fabril de Sabadell. La decisión responde a una reordenación territorial de la cadena Caprabo, que ha priorizado la apertura de un nuevo establecimiento en la plaza del Mestre, en el barrio de Gràcia, en detrimento de su ubicación histórica en el Eixample.",
        "El cierre ha generado un profundo malestar entre vecinos y clientes habituales. Maricarmen S., clienta de toda la vida, explicaba: «El cierre me ha dejado hecha polvo, porque para mí es el mejor de los tres supermercados que tengo aquí localizados». Jessica García lo expresaba con claridad: «Está a un minuto de casa, que va muy bien. Ahora tendremos que ir mucho más lejos para comprar cuando lo teníamos aquí, de toda la vida». Y Rosa Batlló, que acude cada quince días con su padre de 96 años, destaca la pérdida del servicio a domicilio: «Seleccionaban los productos y te los llevaban a casa. Ahora algunas alternativas te piden comprar por internet, y eso no es para todos».",
        "Desde la Asociación de Vecinos del Eixample Sabadell (AVES), su presidente, Antonio, ha expresado la preocupación de la junta vecinal: «El cierre del Caprabo no es solo la pérdida de un supermercado. Es la pérdida de un punto de referencia para muchas familias del barrio. Era un comercio donde la gente se conocía, donde los mayores podían hacer la compra con la tranquilidad de tener un servicio a domicilio que funciona. Es muy triste que se vayan sin que sepamos qué pasará con el edificio».",
        "Y es que el futuro del inmueble es una incógnita. La parte donde se ubica la tienda es de propiedad privada y, a día de hoy, no hay información pública ni planes conocidos sobre su destino. Esto preocupa especialmente a la AVES, que ve cómo el barrio podría perder no solo un comercio de referencia, sino también parte de su memoria histórica. El presidente de la entidad añade: «Nadie sabe qué pasará con ese edificio. Tiene un valor histórico incuestionable, forma parte de la memoria industrial de Sabadell, pero al ser propiedad privada, los vecinos nos quedamos a oscuras. Nos tememos que acabe siendo un solar en desuso, o peor, que se pierda su esencia. Cal Molins merece un futuro a la altura de su pasado».",
        "Mientras tanto, los vecinos del Eixample deberán reubicar sus compras. La alternativa más cercana es el nuevo Caprabo de la plaza del Mestre, a unos diez minutos andando, aunque quienes dependían del coche para la compra semanal o del servicio a domicilio para las personas mayores lo tendrán más complicado. Desde la AVES se reivindica un modelo de barrio que no pierda sus servicios ni su memoria."
      ]
    }
  }
];
