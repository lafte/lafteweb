import { contactInfoRequest } from "./contactInfo.js";

function onRecruitmentLoaded(data) {
  let container = document.getElementById("band-recruitment-container");

  let leaderRoles = [
    "kb-leder",
    "lsl-leder",
    "smoller-leder",
    "snau-leder",
    "salong-leder",
    "symforch-formann",
    "sfo-leder"
  ];

  let leaderInBand = {
    "kb-leder": ["Kjellerbandet", "kb-sjef@samfundet.no"],
    "lsl-leder": ["Leisure Suit Lovers", "lsl@samfundet.no"],
    "smoller-leder": ["S. Møller Storband", "post@smoller.no"],
    "snau-leder": [
      "Snaustrinda Spelemannslag",
      "snaustrinda-sjef@samfundet.no"
    ],
    "salong-leder": [
      "Studentersamfundets Salongsorkester",
      "salong@samfundet.no"
    ],
    "symforch-formann": [
      "Studentersamfundets Symfoniorkester",
      "symforch-formann@samfundet.no"
    ],
    "sfo": [
      "Samfundets Fusion Orkester", 
      "laafte-sfo@samfundet.no"]
  };

  let availableSeatsInBand = {
    "Kjellerbandet": 
      "KB søker til høsten to tenorsaxofoner og en pianist",
    "Leisure Suit Lovers": 
      "Spiller du trompet? Er du interessert i Disco? Liker du ABBA, Earth, Wind & Fire og andre 70/80-talls hits? Søk Leisure Suit Lovers! LSL søker en discoglad trompetist kommende semestester H20! Søk søk søk!",
    "S. Møller Storband":
      "S. Møller har opptak på flere instrumenter, vennligst ta kontakt om du vil vite mer.",
    "Snaustrinda Spelemannslag": 
      "Vi søker nye musikarar på fele, gitar, kontrabass, trekkspel, klarinett og fløyte.",
    "Studentersamfundets Salongsorkester":
      "Se <a href=\"http://salong.samfundet.no/\">Salongorkesterets egne nettsider</a> for mer informasjon om opptak.",
    "Studentersamfundets Symfoniorkester": 
      "Symforch søker trombone, fløyte og obo, men alle som spiller et instrument og ønsker å søke er invitert til åpen øvelse <a href=\"https://www.facebook.com/events/4114562965282491/\">18. august</a>.",
    "Samfundets Fusion Orkester":
      "SFO har opptak på gitar! Ta kontakt hvis du er interessert." 
  };

  let leaders = data.contacts.filter(contact =>
    leaderRoles.includes(contact.role)
  );

  leaders.sort(
    (a, b) => leaderRoles.indexOf(a.role) - leaderRoles.indexOf(b.role)
  );

  leaders.forEach(leader => {
    let container = document.getElementById("band-recruitment-container");
    let node = document.createElement("div");
    let band = leaderInBand[leader.role][0];
    let availableSeats = availableSeatsInBand[band];
    node.className = "band";
    node.innerHTML = `<h3>${band}</h3>
        <h4>Ledige plasser:</h4>
        ${
      availableSeats == null
        ? "<p class='longer-text'><span style='font-style: italic'>Opptaket for våren 2020 er gjennomført.</span></p>"
        : `<p class='longer-text'>${availableSeats}</p><p class='longer-text'><p class="longer-text"> Send epost til <a style = " white-space:nowrap; " href="mailto:${
        leader.email == null
          ? leaderInBand[leader.role][1]
          : leader.email
        }?subject=Opptak">${
        leader.email == null
          ? leaderInBand[leader.role][1]
          : leader.email
        }</a> for å melde interesse.</p> `
      }`;
    container.appendChild(node);
  });
}

document.addEventListener("DOMContentLoaded", event => {
  contactInfoRequest.then(onRecruitmentLoaded);
});
