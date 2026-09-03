/**
 * destinations.js
 * ----------------
 * This is our "database" — a plain JavaScript array of objects.
 * In a real production app this would live on a server and you'd fetch it
 * over an API, but the assignment only requires that IMAGES come from a
 * live API (Pexels/Unsplash). The destination facts themselves are fine
 * to hardcode, so we keep them here as one readable source of truth.
 *
 * Every destination is framed around films shot there — that's the
 * concept of this whole app: "explore the world through the movies
 * that were filmed in it."
 *
 * Fields:
 *  - id            : url-safe unique key, used in the route /destination/:id
 *  - name          : display name of the destination
 *  - country       : shown as a sub-label
 *  - lat / lon     : used to query OpenWeather for live weather
 *  - moods         : tags used by the filter bar (array of strings)
 *  - tagline       : one line shown on the destination card
 *  - description   : longer paragraph shown on the detail page
 *  - imageQuery    : search term sent to the image API for the hero photo
 *  - films         : movies/shows that were filmed there (context, not clickable)
 *  - places        : the "famous places" — each has its own name, blurb,
 *                    and imageQuery so the image API can find a real photo
 */

export const destinations = [
  {
    id: "iceland",
    name: "South Iceland",
    country: "Iceland",
    lat: 63.9,
    lon: -16.9,
    moods: ["Epic Landscapes", "Sci-Fi & Fantasy"],
    tagline: "Glaciers, black sand, and other-worldly light.",
    description:
      "The stretch of coastline between Reykjavík and Vatnajökull has stood in for other planets more often than it's played itself. Glacier lagoons, basalt beaches, and a sky that rarely settles make it one of the most photographed landscapes in modern cinema.",
    imageQuery: "iceland glacier lagoon landscape",
    films: [
      { title: "Interstellar", note: "Miller's ice planet, shot on Svínafellsjökull glacier" },
      { title: "Rogue One: A Star Wars Story", note: "Jedha's exteriors, shot near Vatnajökull" },
      { title: "Game of Thrones", note: "Lands beyond the Wall" },
    ],
    places: [
      {
        name: "Jökulsárlón Glacier Lagoon",
        blurb: "A lagoon of drifting icebergs calved from Breiðamerkurjökull, right beside the ring road.",
        imageQuery: "jokulsarlon glacier lagoon iceland",
      },
      {
        name: "Reynisfjara Black Sand Beach",
        blurb: "Basalt sea stacks and a shoreline of volcanic black sand, near the village of Vík.",
        imageQuery: "reynisfjara black sand beach iceland",
      },
      {
        name: "Vatnajökull National Park",
        blurb: "Europe's largest ice cap, riddled with glacier caves that turn blue in winter light.",
        imageQuery: "vatnajokull ice cave iceland",
      },
    ],
  },
  {
    id: "new-zealand",
    name: "Waikato & Wellington",
    country: "New Zealand",
    lat: -37.8,
    lon: 175.4,
    moods: ["Sci-Fi & Fantasy", "Epic Landscapes"],
    tagline: "Middle-earth, built and left standing.",
    description:
      "Rolling farmland north of Hamilton and the hill studios of Wellington are where an entire fictional world was built from scratch — and, unusually, partly kept. It's one of the few places you can walk directly into a film's most famous sets.",
    imageQuery: "new zealand green rolling hills countryside",
    films: [
      { title: "The Lord of the Rings trilogy", note: "The Shire, filmed on a working sheep farm" },
      { title: "The Hobbit trilogy", note: "Hobbiton rebuilt in permanent materials" },
    ],
    places: [
      {
        name: "Hobbiton Movie Set",
        blurb: "44 hobbit holes and the Green Dragon Inn, still standing on the original Alexander farm.",
        imageQuery: "hobbiton movie set new zealand",
      },
      {
        name: "Tongariro National Park",
        blurb: "Volcanic plateau used for Mordor's exteriors, now a dual World Heritage site.",
        imageQuery: "tongariro national park new zealand",
      },
      {
        name: "Weta Workshop, Wellington",
        blurb: "The effects studio behind the trilogy's creatures and armour, open for tours.",
        imageQuery: "weta workshop wellington",
      },
    ],
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    lat: 41.9,
    lon: 12.5,
    moods: ["Romance", "Old World"],
    tagline: "Where every street already looks lit for a scene.",
    description:
      "Postwar Rome gave cinema an entire visual language — sunlit piazzas, scooters, marble worn soft by centuries. Many of its most-filmed corners are still just ordinary streets you can wander into unannounced.",
    imageQuery: "rome italy piazza evening light",
    films: [
      { title: "Roman Holiday", note: "The Spanish Steps and the Mouth of Truth" },
      { title: "La Dolce Vita", note: "The Trevi Fountain wading scene" },
      { title: "The Talented Mr. Ripley", note: "Piazza di Spagna and the cafés nearby" },
    ],
    places: [
      {
        name: "Trevi Fountain",
        blurb: "The baroque fountain where Anita Ekberg waded at 2am in La Dolce Vita.",
        imageQuery: "trevi fountain rome",
      },
      {
        name: "Spanish Steps",
        blurb: "137 steps between Piazza di Spagna and Trinità dei Monti church.",
        imageQuery: "spanish steps rome",
      },
      {
        name: "Colosseum",
        blurb: "The largest ancient amphitheatre ever built, still standing at Rome's centre.",
        imageQuery: "colosseum rome ancient",
      },
    ],
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    lat: 19.08,
    lon: 72.88,
    moods: ["Urban Energy", "Romance"],
    tagline: "The city that runs on its own film industry.",
    description:
      "Home to the largest film industry in the world by volume, Mumbai doesn't just appear in movies — it produces most of them. Marine Drive at dusk, the chawls of Dharavi, and the backlots of Film City are as much a part of Hindi cinema's identity as any actor.",
    imageQuery: "mumbai marine drive skyline sunset",
    films: [
      { title: "Gully Boy", note: "Dharavi's streets and its underground rap scene" },
      { title: "Zindagi Na Milegi Dobara", note: "Opens on Mumbai before the road trip begins" },
      { title: "Dhoom", note: "Marine Drive chase sequences" },
    ],
    places: [
      {
        name: "Film City, Goregaon",
        blurb: "520 acres of standing sets and backlots where much of Hindi cinema is shot.",
        imageQuery: "mumbai film city studio",
      },
      {
        name: "Marine Drive",
        blurb: "The curved bayfront promenade nicknamed the Queen's Necklace for its night lights.",
        imageQuery: "marine drive mumbai night",
      },
      {
        name: "Dharavi",
        blurb: "A dense, industrious neighbourhood and one of Mumbai's most storied filming backdrops.",
        imageQuery: "dharavi mumbai street",
      },
    ],
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    lat: 48.85,
    lon: 2.35,
    moods: ["Romance", "Old World"],
    tagline: "A city that films itself.",
    description:
      "From Montmartre's cobbled slopes to the riverside walks along the Seine, Paris has been cinema's default shorthand for romance for a century. It rewards slow walking more than any checklist.",
    imageQuery: "paris france montmartre street",
    films: [
      { title: "Amélie", note: "Montmartre, especially Rue Lepic and the Café des Deux Moulins" },
      { title: "Before Sunset", note: "A single afternoon walked in near-real time across the city" },
      { title: "Midnight in Paris", note: "Shakespeare and Company and the Seine at night" },
    ],
    places: [
      {
        name: "Montmartre",
        blurb: "The hilltop quarter of steep streets, Sacré-Cœur, and Amélie's fictional café.",
        imageQuery: "montmartre paris sacre coeur",
      },
      {
        name: "Shakespeare and Company",
        blurb: "The English-language bookshop across the Seine from Notre-Dame.",
        imageQuery: "shakespeare and company paris bookstore",
      },
      {
        name: "Pont des Arts",
        blurb: "A pedestrian bridge over the Seine with a clean view down the river.",
        imageQuery: "pont des arts paris seine",
      },
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    lat: 35.68,
    lon: 139.69,
    moods: ["Urban Energy", "Sci-Fi & Fantasy"],
    tagline: "Neon by night, quiet shrines by morning.",
    description:
      "Tokyo holds two cities at once — the neon scale of Shibuya and Shinjuku, and the quiet of a shrine street a block away. Films set here tend to sit with that contrast rather than resolve it.",
    imageQuery: "tokyo japan shibuya night neon",
    films: [
      { title: "Lost in Translation", note: "The Park Hyatt Tokyo's New York Bar and hotel corridors" },
      { title: "Kill Bill: Vol. 1", note: "The House of Blue Leaves sequence, styled after Gonpachi" },
    ],
    places: [
      {
        name: "Shibuya Crossing",
        blurb: "The busiest pedestrian crossing in the world, framed by a wall of screens.",
        imageQuery: "shibuya crossing tokyo",
      },
      {
        name: "Golden Gai",
        blurb: "A tight grid of alleyways in Shinjuku holding roughly 200 tiny bars.",
        imageQuery: "golden gai shinjuku tokyo alley",
      },
      {
        name: "Senso-ji Temple",
        blurb: "Tokyo's oldest temple, at the end of the Nakamise shopping street in Asakusa.",
        imageQuery: "sensoji temple asakusa tokyo",
      },
    ],
  },
  {
    id: "morocco",
    name: "Ouarzazate & Marrakech",
    country: "Morocco",
    lat: 31.0,
    lon: -6.9,
    moods: ["Epic Landscapes", "Old World"],
    tagline: "The desert that plays every desert.",
    description:
      "Just past the Atlas Mountains, Ouarzazate's dry light and mudbrick kasbahs have doubled for ancient Rome, Egypt, and fictional deserts alike. Marrakech's medina supplies the noise and colour that the empty desert doesn't.",
    imageQuery: "morocco desert kasbah ait benhaddou",
    films: [
      { title: "Gladiator", note: "North African exteriors shot around Ouarzazate" },
      { title: "Lawrence of Arabia", note: "Desert sequences near the Atlas foothills" },
      { title: "Game of Thrones", note: "Yunkai's exteriors, shot in Essaouira and Ouarzazate" },
    ],
    places: [
      {
        name: "Aït Benhaddou",
        blurb: "A fortified clay-brick village on an old caravan route, UNESCO-listed since 1987.",
        imageQuery: "ait benhaddou morocco kasbah",
      },
      {
        name: "Atlas Film Studios",
        blurb: "One of the largest film studios in the world by land area, still active today.",
        imageQuery: "atlas studios ouarzazate morocco",
      },
      {
        name: "Jemaa el-Fna, Marrakech",
        blurb: "The medina's central square — storytellers, food stalls, and snake charmers by dusk.",
        imageQuery: "jemaa el fna marrakech square",
      },
    ],
  },
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    lat: 40.71,
    lon: -74.0,
    moods: ["Urban Energy", "Romance"],
    tagline: "The most filmed skyline on earth.",
    description:
      "No city has been used as a backdrop more often — for romance, for noir, for disaster and comedy alike. Its landmarks are recognisable enough that films rarely need to establish where you are.",
    imageQuery: "new york city skyline manhattan",
    films: [
      { title: "Manhattan", note: "Shot in black and white across the Upper East Side and Central Park" },
      { title: "When Harry Met Sally", note: "Katz's Delicatessen, among other stops" },
      { title: "Home Alone 2", note: "The Gapstow Bridge in Central Park" },
    ],
    places: [
      {
        name: "Central Park",
        blurb: "843 acres of planned landscape at the centre of Manhattan.",
        imageQuery: "central park new york autumn",
      },
      {
        name: "Empire State Building",
        blurb: "The Art Deco landmark that closes out more films than almost any other building.",
        imageQuery: "empire state building new york",
      },
      {
        name: "Katz's Delicatessen",
        blurb: "A Lower East Side deli operating since 1888, famous well beyond its pastrami.",
        imageQuery: "katz's delicatessen new york",
      },
    ],
  },
];

/** Small helper used by the detail page to find one destination by its id. */
export function getDestinationById(id) {
  return destinations.find((d) => d.id === id);
}

/** All unique mood tags, used to build the filter bar's buttons automatically. */
export function getAllMoods() {
  const set = new Set();
  destinations.forEach((d) => d.moods.forEach((m) => set.add(m)));
  return Array.from(set);
}
