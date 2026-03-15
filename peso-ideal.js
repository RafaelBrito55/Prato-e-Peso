document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('peso-ideal-form');
  const resultado = document.getElementById('resultado-peso-ideal');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const alturaInput = document.getElementById('altura');
    const alturaCm = parseFloat((alturaInput.value || '').replace(',', '.'));

    if (isNaN(alturaCm) || alturaCm <= 0) {
      resultado.innerHTML = `
        <p>⚠ Por favor, informe uma <strong>altura</strong> válida em centímetros.</p>
      `;
      return;
    }

    const alturaM = alturaCm / 100;

    // Usando IMC 18,5 e 24,9 como faixa saudável
    const pesoMin = 18.5 * alturaM * alturaM;
    const pesoMax = 24.9 * alturaM * alturaM;

    const pesoMinFmt = pesoMin.toFixed(1).replace('.', ',');
    const pesoMaxFmt = pesoMax.toFixed(1).replace('.', ',');

    resultado.innerHTML = `
      <p class="imc-value">
        Para ${alturaCm.toFixed(1).replace('.', ',')} cm de altura,<br>
        uma faixa de peso considerada saudável fica entre
        <strong>${pesoMinFmt} kg</strong> e <strong>${pesoMaxFmt} kg</strong>.
      </p>
      <p class="imc-extra">
        Lembre-se: isso é uma estimativa baseada em IMC. Avaliações mais completas devem ser feitas
        com um profissional de saúde.
      </p>
    `;
  });
});
