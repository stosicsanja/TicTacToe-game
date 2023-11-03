let celije = document.querySelectorAll(".celija");
let restartDugme = document.getElementById("restart");
let statusTekst = document.getElementById("statusTekst");
console.log(celije, restartDugme, statusTekst);

let Victory_Niz = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let Tabela_Niz = [null, null, null, null, null, null, null, null, null];
let trenutniIgrac = "X";
let igra = false;

pocetakIgre();
function pocetakIgre() {
  celije.forEach((celija) => celija.addEventListener("click", celijaKlinkuta));
  restartDugme.addEventListener("click", restartujIgru);
  statusTekst.textContent = `${trenutniIgrac} je na redu`;
  igra = true;
}

function celijaKlinkuta() {
  const celija = this.getAttribute("celija-index");

  if ((Tabela_Niz[celija] = null || !igra)) {
    return;
  }
  apdejtCelije(this, celija);
  proveriPobednika();
}

function apdejtCelije(celija, index) {
  Tabela_Niz[index] = trenutniIgrac;
  celija.textContent = trenutniIgrac;
}
function promeniIgraca() {
  trenutniIgrac = trenutniIgrac == "X" ? "O" : "X";
  statusTekst.textContent = `${trenutniIgrac} je na redu`;
}
function proveriPobednika() {
  let OksJePobedio = false;

  for (let i = 0; i < Victory_Niz.length; i++) {
    const uslov = Victory_Niz[i];
    let celija_A = Tabela_Niz[uslov[0]];
    let celija_B = Tabela_Niz[uslov[1]];
    let celija_C = Tabela_Niz[uslov[2]];

    if (celija_A == null && celija_B == null && celija_C == null) {
      continue;
    }

    if (celija_A == celija_B && celija_A == celija_C) {
      OksJePobedio = true;
      break;
    }
  }
  if (OksJePobedio) {
    statusTekst.textContent = `${trenutniIgrac} je pobedio`;
    igra = false;
  } else if (!Tabela_Niz.includes(null)) {
    statusTekst.textContent = `Nereseno. Igraj ponovo`;
    igra = false;
  } else {
    promeniIgraca();
  }
}

function restartujIgru() {
  trenutniIgrac = "X";
  Tabela_Niz = [null, null, null, null, null, null, null, null, null];
  statusTekst.textContent = `${trenutniIgrac} je na redu`;
  celije.forEach((celija) => (celija.textContent = ""));
  igra = true;
}
