# Matilda Media

Matilda Media on **ammattilaisen** mediapaja, joka tekee podcasteja, klippejä ja sisällöntuotantoa modernilla, kasinoteemaisella twistillä [page:1].  
Tavoite: tehdä sun brändistä yhtä koukuttava kuin hyvä slot bonus – ilman tuuria, pelkästään taidolla [page:1].

---

## Palvelut

- Podcast‑tuotanto alusta loppuun (konsepti, nauhoitus, editointi, julkaisu)
- Lyhytformaatit someen (TikTok, Reels, YouTube Shorts)
- Pitkän formaatin editointi (YouTube-jaksot, livestream-väännöt, highlightit)
- Brändätty grafiikka ja visuaalit kasinoviballa
- Julkaisun automatisointi ja perus-optimointi (otsikot, kuvaukset, thumbnaileille tuki)

---

## Teknologia ja stack

Tämä repo sisältää Matilda Median sivuston ja työkalut sisällön ympärille [page:1].

- TypeScript-pohjainen frontti ja backi [page:1]
- Vite bundlaus ja dev-ympäristö [page:1]
- Jaettu `shared/`-kansio tyypit ja logiikkaa varten [page:1]
- PNPM paketinhallintaan [page:1]

Rakenteen pääkansiot:

- `client/` – varsinainen sivusto ja UI
- `server/` – backend-logiikka ja API:t
- `shared/` – jaetut utilit, tyypit yms.
- `patches/` – mahdolliset patchit riippuvuuksille [page:1]

---

## Pika-aloitus

```bash
# Asenna riippuvuudet
pnpm install

# Dev-serveri
pnpm dev

# Build
pnpm build

# Preview buildistä
pnpm preview
