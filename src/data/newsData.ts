export interface Article {
  id: number;
  title: Record<"ca" | "es", string>;
  category: Record<"ca" | "es", string>;
  date: string; // ISO date string for sorting
  readTime: Record<"ca" | "es", string>;
  image: string;
  description: Record<"ca" | "es", string>;
  alt: Record<"ca" | "es", string>;
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
    }
  }
];
