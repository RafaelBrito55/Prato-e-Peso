document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('macros-form');
  const resultado = document.getElementById('resultado-macros');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const caloriasInput = document.getElementById('calorias');
    const calorias = parseFloat(caloriasInput.value);

    if (isNaN(calorias) || calorias <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe uma <strong>meta de calorias por dia</strong> válida.</p>
      `;
      atualizaTabela('-', '-', '-', '-', '-', '-');
      return;
    }

    // Percentuais padrão
    const pctProteina = 0.30;
    const pctCarbo = 0.40;
    const pctGordura = 0.30;

    const kcalProteina = Math.round(calorias * pctProteina);
    const kcalCarbo = Math.round(calorias * pctCarbo);
    const kcalGordura = Math.round(calorias * pctGordura);

    const gProteina = Math.round(kcalProteina / 4);
    const gCarbo = Math.round(kcalCarbo / 4);
    const gGordura = Math.round(kcalGordura / 9);

    resultado.innerHTML = `
      <p class="imc-value">Para <strong>${calorias} kcal/dia</strong>, uma divisão equilibrada ficaria assim:</p>
      <p class="imc-extra">
        Cerca de <strong>30% proteínas</strong>, <strong>40% carboidratos</strong> e <strong>30% gorduras</strong>.
      </p>
    `;

    atualizaTabela(
      `${kcalProteina} kcal`,
      `${gProteina} g`,
      `${kcalCarbo} kcal`,
      `${gCarbo} g`,
      `${kcalGordura} kcal`,
      `${gGordura} g`
    );
  });

  function atualizaTabela(kcalP, gP, kcalC, gC, kcalG, gG) {
    const elKcalP = document.getElementById('kcal-proteina');
    const elGP = document.getElementById('g-proteina');
    const elKcalC = document.getElementById('kcal-carbo');
    const elGC = document.getElementById('g-carbo');
    const elKcalG = document.getElementById('kcal-gordura');
    const elGG = document.getElementById('g-gordura');

    if (!elKcalP || !elGP || !elKcalC || !elGC || !elKcalG || !elGG) return;

    elKcalP.textContent = kcalP;
    elGP.textContent = gP;
    elKcalC.textContent = kcalC;
    elGC.textContent = gC;
    elKcalG.textContent = kcalG;
    elGG.textContent = gG;
  }
});
