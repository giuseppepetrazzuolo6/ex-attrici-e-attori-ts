/*📌 Milestone 1
Crea un type alias Person per rappresentare una persona generica.

Il tipo deve includere le seguenti proprietà:

id: numero identificativo, non modificabile
name: nome completo, stringa non modificabile
birth_year: anno di nascita, numero
death_year: anno di morte, numero opzionale
biography: breve biografia, stringa
image: URL dell'immagine, stringa */

type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string, 
}

/*📌 Milestone 2
Crea un type alias Actress che oltre a tutte le proprietà di Person, aggiunge le seguenti proprietà:

most_famous_movies: una tuple di 3 stringhe
awards: una stringa
nationality: una stringa tra un insieme definito di valori.
Le nazionalità accettate sono: 
American, British, Australian, Israeli-American, South African, French, Indian, Israeli, Spanish, South Korean, Chinese. */

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality:
    | "American"
    | "British"
    | "Australian"
    | "Israeli-American"
    | "South African"
    | "French"
    | "Indian"
    | "Israeli"
    | "Spanish"
    | "South Korean"
    | "Chinese";
}

/*📌 Milestone 3
Crea una funzione getActress che, dato un id, effettua una chiamata a:

GET /actresses/:id
La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta. */

function isActress(data: any): data is Actress {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "number" &&
    typeof data.name === "string" &&
    typeof data.birth_year === "number" &&
    (data.death_year === undefined || typeof data.death_year === "number") &&
    typeof data.biography === "string" &&
    typeof data.image === "string" &&
    typeof data.awards === "string" &&
    Array.isArray(data.most_famous_movies) &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every((m: any) => typeof m === "string") &&
    ["American","British","Australian","Israeli-American","South African","French","Indian","Israeli","Spanish","South Korean","Chinese"]
      .includes(data.nationality)
  );
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);

 if (!response.ok) {
      throw new Error(`Errore http ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (isActress(data)) {
      return data;
    }

    return null;
  } catch {
    return null;
  }
}

/*📌 Milestone 4
Crea una funzione getAllActresses che chiama:

GET /actresses
La funzione deve restituire un array di oggetti Actress.

Può essere anche un array vuoto. */

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch("http://localhost:3333/actresses");

    if (!response.ok) return [];

    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data.filter(isActress);
  } catch {
    return [];
  }
}
