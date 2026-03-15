document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tdee-form');
  const resultado = document.getElementById('resultado-tdee');

  if (!form || !resultado) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const sexo = form.querySelector('input[name="sexo"]:checked')?.value || 'M';
    const idadeInput = document.getElementById('idade');
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    const atividadeSelect = document.getElementById('atividade');

    const idade = parseInt(idadeInput.value, 10);
    const peso = parseFloat((pesoInput.value || '').replace(',', '.'));
    const alturaCm = parseFloat((alturaInput.value || '').replace(',', '.'));
    const fatorAtividade = parseFloat(atividadeSelect.value);

    if (
      isNaN(idade) || idade <= 0 ||
      isNaN(peso) || peso <= 0 ||
      isNaN(alturaCm) || alturaCm <= 0 ||
      isNaN(fatorAtividade) || fatorAtividade <= 0
    ) {
      resultado.innerHTML = `
        <p>⚠ Por favor, preencha <strong>idade</strong>, <strong>peso</strong>, <strong>altura</strong> e <strong>atividade</strong> corretamente.</p>
      `;
      atualizaTabela('-', '-', '-', '-');
      return;
    }

    // Fórmula de Mifflin-St Jeor
    let tmb;
    if (sexo === 'F') {
      tmb = (10 * peso) + (6.25 * alturaCm) - (5 * idade) - 161;
    } else {
      tmb = (10 * peso) + (6.25 * alturaCm) - (5 * idade) + 5;
    }

    const tdee = Math.round(tmb * fatorAtividade);

    const deficitModerado = Math.round(tdee - 400);
    const deficitAgressivo = Math.round(tdee - 700);
    const manter = tdee;
    const superavit = Math.round(tdee + 300);

    resultado.innerHTML = `
      <p class="imc-value">Seu gasto calórico diário estimado é de <strong>${tdee} kcal</strong>.</p>
      <p class="imc-extra">
        Use esse número como referência para montar sua dieta: abaixo dele tende a emagrecer,
        próximo dele tende a manter, acima tende a ganhar peso.
      </p>
    `;

    atualizaTabela(deficitModerado, deficitAgressivo, manter, superavit);
  });

  function atualizaTabela(defMod, defAgr, manter, sup) {
    const elDefMod = document.getElementById('cal-deficit-moderado');
    const elDefAgr = document.getElementById('cal-deficit-agressivo');
    const elManter = document.getElementById('cal-manter');
    const elSup = document.getElementById('cal-superavit');

    if (!elDefMod || !elDefAgr || !elManter || !elSup) return;

    elDefMod.textContent = typeof defMod === 'number' ? `${defMod} kcal` : defMod;
    elDefAgr.textContent = typeof defAgr === 'number' ? `${defAgr} kcal` : defAgr;
    elManter.textContent = typeof manter === 'number' ? `${manter} kcal` : manter;
    elSup.textContent = typeof sup === 'number' ? `${sup} kcal` : sup;
  }
});
