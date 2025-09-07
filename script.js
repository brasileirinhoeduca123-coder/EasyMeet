const novaBtn = document.getElementById('novaBtn');
const novaReuniao = document.getElementById('novaReuniao');
const proximoBtn = document.getElementById('proximoBtn');
const reunioesList = document.getElementById('reunioes');
const nomeInput = document.getElementById('nome');
const dataHoraInput = document.getElementById('dataHora');
const somFlip = document.getElementById('somFlip');
const somTrash = document.getElementById('somTrash');
const okBtn = document.getElementById('okBtn');

novaBtn.addEventListener('click', () => {
    novaReuniao.style.display = 'block';
});

proximoBtn.addEventListener('click', () => {
    const nome = nomeInput.value;
    const dataHora = dataHoraInput.value;

    if (nome && dataHora) {
        const li = document.createElement('li');
        li.textContent = `📝 ${nome} ⏰ ${new Date(dataHora).toLocaleString('pt-BR')}`;

        // Botão de lixeira 🗑️
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        deleteBtn.addEventListener('click', () => {
            li.remove();
            somTrash.play();
        });

        reunioesList.appendChild(li);

        nomeInput.value = '';
        dataHoraInput.value = '';
        novaReuniao.style.display = 'none';

        // Programar som na hora marcada
        const now = new Date();
        const reuniaoDate = new Date(dataHora);
        const delay = reuniaoDate - now;
        if (delay > 0) {
            setTimeout(() => {
                somFlip.play();
                okBtn.style.display = 'block';
                okBtn.classList.add('pisca');
            }, delay);
        }
    }
});

// Botão OK ✅ para parar som
okBtn.addEventListener('click', () => {
    somFlip.pause();
    somFlip.currentTime = 0;
    okBtn.style.display = 'none';
    okBtn.classList.remove('pisca');
});

