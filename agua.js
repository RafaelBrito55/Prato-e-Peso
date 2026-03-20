document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('agua-form');
  const resultado = document.getElementById('resultado-agua');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pesoInput = document.getElementById('peso');
    const atividadeSelect = document.getElementById('atividade');

    const peso = parseFloat((pesoInput.value || '').replace(',', '.'));
    const mlPorKg = parseFloat(atividadeSelect.value);

    if (Number.isNaN(peso) || peso <= 0 || Number.isNaN(mlPorKg) || mlPorKg <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe um <strong>peso</strong> válido e escolha o <strong>nível de atividade</strong>.</p>
      `;
      atualizaResumo('-', '-', '-', '-', '-');
      return;
    }

    const mlDia = Math.round(peso * mlPorKg);
    const litrosDia = mlDia / 1000;
    const copos = Math.round(mlDia / 250);
    const garrafas = Math.round(mlDia / 500);

    resultado.innerHTML = `
      <p class="imc-value">
        Para <strong>${peso.toFixed(1).replace('.', ',')} kg</strong>, a estimativa é de
        <strong>${litrosDia.toFixed(2).replace('.', ',')} L</strong> de água por dia.
      </p>
      <p class="imc-extra">Nesta conta, usamos <strong>${mlPorKg} mL por kg</strong> conforme o nível de atividade informado.</p>
      <p class="imc-extra">Distribuir essa quantidade ao longo do dia costuma ser mais prático do que tentar compensar tudo de uma vez.</p>
    `;

    atualizaResumo(
      `${mlPorKg} mL/kg`,
      `${mlDia} mL`,
      `${litrosDia.toFixed(2).replace('.', ',')} L`,
      `${copos} copos`,
      `${garrafas} garrafas`
    );
  });

  function atualizaResumo(base, ml, litros, copos, garrafas) {
    const elBase = document.getElementById('ml-kg');
    const elMl = document.getElementById('ml-dia');
    const elLitros = document.getElementById('litros-dia');
    const elCopos = document.getElementById('copos-dia');
    const elGarrafas = document.getElementById('garrafas-dia');

    if (!elBase || !elMl || !elLitros || !elCopos || !elGarrafas) return;

    elBase.textContent = base;
    elMl.textContent = ml;
    elLitros.textContent = litros;
    elCopos.textContent = copos;
    elGarrafas.textContent = garrafas;
  }
});
