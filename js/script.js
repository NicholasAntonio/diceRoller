document.addEventListener('DOMContentLoaded', function () {
    const rollButton = document.getElementById('rollButton');
    const diceTypeSelect = document.getElementById('diceType');
    const bonusInput = document.getElementById('bonus');
    const numDiceInput = document.getElementById('numDice');
    const resultParagraph = document.getElementById('result');

    rollButton.addEventListener('click', rollDice);

    function rollDice() {
        const selectedDice = diceTypeSelect.value;
        const numDice = parseInt(numDiceInput.value) || 1;
        const bonus = parseInt(bonusInput.value) || 0;
        let totalResult = 0;

        let resultText = `Você rolou ${numDice} ${selectedDice} de resultado:  `;

        if (numDice <= 0) {
            resultParagraph.textContent = "O número de dados precisa ser positivo ou 0";
            return;
        }

        resultParagraph.innerHTML = '<img src="./assets/loading.gif" alt="Carregando..." class="loading-gif">';

        setTimeout(function () {
            for (let i = 0; i < numDice; i++) {
                const rollResult = Math.floor(Math.random() * parseInt(selectedDice.slice(1)) + 1);
                totalResult += rollResult;

                resultText += rollResult;
                if (i < numDice - 1) {
                    resultText += ' + ';
                }
            }

            if (selectedDice === 'd20') {
                if (totalResult === numDice) {
                    resultText = `<span class= 'failure-message'> Falha crítica!</span>`;
                } else if (totalResult === numDice * 20) {
                    resultText = `<span class= 'sucess-message'> Sucesso crítico!</span>`;
                }
            } else if (selectedDice === 'd100') {
                if (totalResult === numDice) {
                    resultText ==  `<span class= 'failure-message'> Falha crítica!</span>`;
                } else if (totalResult === numDice * 100) {
                    resultText = `<span class= 'sucess-message'> Sucesso crítico!</span>` ;
                }
            }

            const totalWithBonus = totalResult + bonus;
            if (bonus !== 0) {
                resultText += ` (bônus de ${bonus}, total com bônus: ${totalWithBonus})`;
            } else {
                resultText += ` (total: ${totalResult})`;
            }

            resultParagraph.innerHTML = `<span class='result-text'>${resultText}</span>`;
        }, 1000); 
    }
});
