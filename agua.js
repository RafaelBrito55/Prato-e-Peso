document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('agua-form');
  const resultado = document.getElementById('resultado-agua');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pesoInput = document.getElementById('peso');
    const atividadeSelect = document.getElementById('atividade');

    const peso = parseFloat((pesoInput.value || '').replace(',', '.'));
    const mlPorKg = parseFloat(atividadeSelect.value); // 30, 35 ou 40

    if (isNaN(peso) || peso <= 0 || isNaN(mlPorKg) || mlPorKg <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe um <strong>peso</strong> válido e escolha o <strong>nível de atividade</strong>.</p>
      `;
      atualizaResumo('-', '-', '-');
      return;
    }

    const mlDia = peso * mlPorKg;
    const litrosDia = mlDia / 1000;

    const copos = Math.round(mlDia / 250);
    const garrafas = Math.round(mlDia / 500);

    resultado.innerHTML = `
      <p class="imc-value">
        Para <strong>${peso.toFixed(1).replace('.', ',')} kg</strong> e esse nível de atividade, 
        a estimativa é de <strong>${litrosDia.toFixed(2).replace('.', ',')} L</strong> de água por dia.
      </p>
      <p class="imc-extra">
        Lembre-se de distribuir essa quantidade ao longo do dia e ajustar em dias muito quentes
        ou de treinos mais intensos.
      </p>
    `;

    atualizaResumo(
      `${litrosDia.toFixed(2).replace('.', ',')} L`,
      `${copos} copos`,
      `${garrafas} garrafas`
    );
  });

  function atualizaResumo(litros, copos, garrafas) {
    const elLitros = document.getElementById('litros-dia');
    const elCopos = document.getElementById('copos-dia');
    const elGarrafas = document.getElementById('garrafas-dia');

    if (!elLitros || !elCopos || !elGarrafas) return;

    elLitros.textContent = litros;
    elCopos.textContent = copos;
    elGarrafas.textContent = garrafas;
  }
});
