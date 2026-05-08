document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('peso-ideal-form');
  const resultado = document.getElementById('resultado-peso-ideal');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const alturaInput = document.getElementById('altura');
    const pesoAtualInput = document.getElementById('peso-atual');

    const alturaCm = parseFloat((alturaInput.value || '').replace(',', '.'));
    const pesoAtual = parseFloat((pesoAtualInput.value || '').replace(',', '.'));
    const temPesoAtual = !Number.isNaN(pesoAtual) && pesoAtual > 0;

    if (Number.isNaN(alturaCm) || alturaCm <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe uma <strong>altura</strong> válida em centímetros.</p>
      `;
      return;
    }

    const alturaM = alturaCm / 100;
    const pesoMin = 18.5 * alturaM * alturaM;
    const pesoMax = 24.9 * alturaM * alturaM;
    const pesoMeio = (pesoMin + pesoMax) / 2;

    const alturaFmt = alturaCm.toFixed(1).replace('.', ',');
    const pesoMinFmt = pesoMin.toFixed(1).replace('.', ',');
    const pesoMaxFmt = pesoMax.toFixed(1).replace('.', ',');
    const pesoMeioFmt = pesoMeio.toFixed(1).replace('.', ',');

    let comparativo = '';

    if (temPesoAtual) {
      const pesoAtualFmt = pesoAtual.toFixed(1).replace('.', ',');

      if (pesoAtual < pesoMin) {
        const diff = (pesoMin - pesoAtual).toFixed(1).replace('.', ',');
        comparativo = `<p class="imc-extra">Seu peso atual de <strong>${pesoAtualFmt} kg</strong> está cerca de <strong>${diff} kg</strong> abaixo do limite inferior dessa faixa de referência.</p>`;
      } else if (pesoAtual > pesoMax) {
        const diff = (pesoAtual - pesoMax).toFixed(1).replace('.', ',');
        comparativo = `<p class="imc-extra">Seu peso atual de <strong>${pesoAtualFmt} kg</strong> está cerca de <strong>${diff} kg</strong> acima do limite superior dessa faixa de referência.</p>`;
      } else {
        comparativo = `<p class="imc-extra">Seu peso atual de <strong>${pesoAtualFmt} kg</strong> está dentro dessa faixa de referência.</p>`;
      }
    }

    resultado.innerHTML = `
      <p class="imc-value">
        Para <strong>${alturaFmt} cm</strong>, a faixa de peso de referência fica entre
        <strong>${pesoMinFmt} kg</strong> e <strong>${pesoMaxFmt} kg</strong>.
      </p>
      <p class="imc-extra">O ponto central dessa faixa fica perto de <strong>${pesoMeioFmt} kg</strong>.</p>
      ${comparativo}
      <p class="imc-extra">Esta calculadora usa a referência clássica de IMC saudável. Composição corporal e massa muscular podem mudar bastante a interpretação.</p>
    `;
  });
});
