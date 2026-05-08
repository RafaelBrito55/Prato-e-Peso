document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('imc-form');
  const resultado = document.getElementById('resultado-imc');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');

    if (!pesoInput || !alturaInput) return;

    // Aceitar vírgula ou ponto
    const peso = parseFloat((pesoInput.value || '').replace(',', '.'));
    const alturaCm = parseFloat((alturaInput.value || '').replace(',', '.'));

    if (
      isNaN(peso) || isNaN(alturaCm) ||
      peso <= 0 || alturaCm <= 0
    ) {
      resultado.innerHTML = `
        <p>⚠ Por favor, preencha <strong>peso</strong> e <strong>altura</strong> corretamente.</p>
      `;
      return;
    }

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);
    const imcFormatado = imc.toFixed(1).replace('.', ',');

    let classificacao = '';
    let mensagem = '';

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
      mensagem = 'Seu IMC indica baixo peso. Vale a pena conversar com um profissional de saúde.';
    } else if (imc < 25) {
      classificacao = 'Peso normal';
      mensagem = 'Seu IMC está dentro da faixa considerada saudável para a maioria das pessoas.';
    } else if (imc < 30) {
      classificacao = 'Sobrepeso';
      mensagem = 'Seu IMC indica sobrepeso. Talvez seja um bom momento para revisar alimentação e rotina.';
    } else if (imc < 35) {
      classificacao = 'Obesidade grau I';
      mensagem = 'Seu IMC está na faixa de obesidade grau I. Procure acompanhamento profissional.';
    } else if (imc < 40) {
      classificacao = 'Obesidade grau II';
      mensagem = 'Seu IMC está na faixa de obesidade grau II. Busque orientação especializada o quanto antes.';
    } else {
      classificacao = 'Obesidade grau III';
      mensagem = 'Seu IMC está na faixa de obesidade grau III. O acompanhamento médico é fundamental.';
    }

    resultado.innerHTML = `
      <p class="imc-value">Seu IMC é <strong>${imcFormatado}</strong></p>
      <p class="imc-status">Classificação: <strong>${classificacao}</strong></p>
      <p class="imc-extra">${mensagem}</p>
    `;
  });
});
