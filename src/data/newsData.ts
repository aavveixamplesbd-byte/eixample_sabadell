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
  }
];
