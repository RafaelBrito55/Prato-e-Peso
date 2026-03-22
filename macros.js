document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('macros-form');
  const resultado = document.getElementById('resultado-macros');
  const radiosModo = document.querySelectorAll('input[name="modo-macros"]');
  const painelCalorias = document.getElementById('modo-calorias');
  const painelPeso = document.getElementById('modo-peso');
  const opcoesModo = document.querySelectorAll('.mode-option');

  if (!form || !resultado) return;

  radiosModo.forEach((radio) => {
    radio.addEventListener('change', () => {
      const modo = radio.value;
      const usarCalorias = modo === 'calorias';

      painelCalorias.classList.toggle('is-hidden', !usarCalorias);
      painelCalorias.classList.toggle('active', usarCalorias);
      painelPeso.classList.toggle('is-hidden', usarCalorias);
      painelPeso.classList.toggle('active', !usarCalorias);

      opcoesModo.forEach((opcao) => {
        const input = opcao.querySelector('input');
        opcao.classList.toggle('active', input.checked);
      });
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const modo = form.querySelector('input[name="modo-macros"]:checked')?.value || 'calorias';

    if (modo === 'peso') {
      calcularPorPeso();
      return;
    }

    calcularPorCalorias();
  });

  function calcularPorCalorias() {
    const caloriasInput = document.getElementById('calorias');
    const calorias = parseFloat(caloriasInput.value);

    if (Number.isNaN(calorias) || calorias <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe uma <strong>meta de calorias por dia</strong> válida.</p>
      `;
      atualizaTabela('-', '-', '-', '-', '-', '-', '-', '-');
      return;
    }

    const pctProteina = 0.30;
    const pctCarbo = 0.40;
    const pctGordura = 0.30;

    const kcalProteina = Math.round(calorias * pctProteina);
    const kcalCarbo = Math.round(calorias * pctCarbo);
    const kcalGordura = Math.round(calorias * pctGordura);

    const gProteina = Math.round(kcalProteina / 4);
    const gCarbo = Math.round(kcalCarbo / 4);
    const gGordura = Math.round(kcalGordura / 9);
    const gTotal = gProteina + gCarbo + gGordura;

    resultado.innerHTML = `
      <p class="imc-value">Para <strong>${Math.round(calorias)} kcal/dia</strong>, esta divisão fica assim:</p>
      <p class="imc-extra">Usamos <strong>30% proteína</strong>, <strong>40% carboidratos</strong> e <strong>30% gorduras</strong> como ponto de partida.</p>
    `;

    atualizaTabela(
      `${kcalProteina} kcal`, `${gProteina} g`,
      `${kcalCarbo} kcal`, `${gCarbo} g`,
      `${kcalGordura} kcal`, `${gGordura} g`,
      `${kcalProteina + kcalCarbo + kcalGordura} kcal`, `${gTotal} g`
    );
  }

  function calcularPorPeso() {
    const pesoInput = document.getElementById('peso-macros');
    const objetivoSelect = document.getElementById('objetivo-macros');

    const peso = parseFloat((pesoInput.value || '').replace(',', '.'));
    const objetivo = objetivoSelect.value;

    if (Number.isNaN(peso) || peso <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe um <strong>peso corporal</strong> válido.</p>
      `;
      atualizaTabela('-', '-', '-', '-', '-', '-', '-', '-');
      return;
    }

    const referencias = {
      emagrecer: { proteina: 1.8, carbo: 2.0, gordura: 0.8, nome: 'emagrecer' },
      manter: { proteina: 1.6, carbo: 3.0, gordura: 0.9, nome: 'manter o peso' },
      ganhar: { proteina: 1.8, carbo: 4.0, gordura: 1.0, nome: 'ganhar peso' }
    };

    const ref = referencias[objetivo] || referencias.manter;

    const gProteina = Math.round(peso * ref.proteina);
    const gCarbo = Math.round(peso * ref.carbo);
    const gGordura = Math.round(peso * ref.gordura);

    const kcalProteina = gProteina * 4;
    const kcalCarbo = gCarbo * 4;
    const kcalGordura = gGordura * 9;
    const kcalTotal = kcalProteina + kcalCarbo + kcalGordura;
    const gTotal = gProteina + gCarbo + gGordura;

    resultado.innerHTML = `
      <p class="imc-value">Para <strong>${peso.toFixed(1).replace('.', ',')} kg</strong>, a referência prática de macros fica assim:</p>
      <p class="imc-extra">Objetivo selecionado: <strong>${ref.nome}</strong>.</p>
      <p class="imc-extra">Base usada: proteína <strong>${ref.proteina} g/kg</strong>, carboidrato <strong>${ref.carbo} g/kg</strong> e gordura <strong>${ref.gordura} g/kg</strong>.</p>
    `;

    atualizaTabela(
      `${kcalProteina} kcal`, `${gProteina} g`,
      `${kcalCarbo} kcal`, `${gCarbo} g`,
      `${kcalGordura} kcal`, `${gGordura} g`,
      `${kcalTotal} kcal`, `${gTotal} g`
    );
  }

  function atualizaTabela(kcalP, gP, kcalC, gC, kcalG, gG, kcalTotal, gTotal) {
    const elKcalP = document.getElementById('kcal-proteina');
    const elGP = document.getElementById('g-proteina');
    const elKcalC = document.getElementById('kcal-carbo');
    const elGC = document.getElementById('g-carbo');
    const elKcalG = document.getElementById('kcal-gordura');
    const elGG = document.getElementById('g-gordura');
    const elKcalTotal = document.getElementById('kcal-total');
    const elGTotal = document.getElementById('g-total');

    if (!elKcalP || !elGP || !elKcalC || !elGC || !elKcalG || !elGG || !elKcalTotal || !elGTotal) return;

    elKcalP.textContent = kcalP;
    elGP.textContent = gP;
    elKcalC.textContent = kcalC;
    elGC.textContent = gC;
    elKcalG.textContent = kcalG;
    elGG.textContent = gG;
    elKcalTotal.textContent = kcalTotal;
    elGTotal.textContent = gTotal;
  }
});
