let membros = ["Wisley", "Rian", "Samuel", "Alerrandro", "Jonas", "Guilherme"];
let funcoes = ["Capitão da Unidade", "Capelão", "Secretário", "Tesoureiro", "Padioleiro", "Almoxarife"];
let pontos = {};
membros.forEach(nome => pontos[nome] = 0);

// Atualiza a tabela de classificação
function atualizarClassificacao() {
    let classificacao = Object.entries(pontos).sort((a, b) => b[1] - a[1]);
    document.getElementById("tabelaClassificacao").innerHTML = classificacao.map((item, index) => ` 
        <tr>
            <td>${index + 1}º</td>
            <td>${item[0]}</td>
            <td>${item[1]}</td>
        </tr>
    `).join('');
}

// Atualiza os pontos de um membro
function atualizarPontos(nome, valor) {
    pontos[nome] += valor;
    document.getElementById(`pontos-${nome}`).innerText = pontos[nome];
    atualizarClassificacao();
}

// Cria a tabela principal com os botões de pontuação
document.getElementById("tabelaPontos").innerHTML = membros.map(nome => ` 
    <tr>
        <td>${nome}</td>
        <td><button onclick="atualizarPontos('${nome}', 10)">✔</button> <button onclick="atualizarPontos('${nome}', -15)">❌</button></td>
        <td><button onclick="atualizarPontos('${nome}', 10)">✔</button></td>
        <td><button onclick="atualizarPontos('${nome}', 10)">✔</button></td>
        <td><button onclick="atualizarPontos('${nome}', 10)">✔</button></td>
        <td><button onclick="atualizarPontos('${nome}', 10)">✔</button> <button onclick="atualizarPontos('${nome}', -15)">❌</button></td>
        <td id="pontos-${nome}">0</td>
    </tr>
`).join('');

// Função para salvar a pontuação no localStorage
function salvarPontuacao() {
    const data = document.getElementById("dataPontuacao").value;
    if (!data) {
        alert("Escolha uma data para salvar a pontuação!");
        return;
    }
    let registros = JSON.parse(localStorage.getItem("pontuacoes")) || {};
    registros[data] = { ...pontos };
    localStorage.setItem("pontuacoes", JSON.stringify(registros));
    alert("Pontuação salva com sucesso!");
    exibirHistorico();
}

// Exibe o histórico salvo
function exibirHistorico() {
    const historicoDiv = document.getElementById("historico");
    let registros = JSON.parse(localStorage.getItem("pontuacoes")) || {};
    let html = Object.entries(registros).map(([data, pontos]) => {
        let linhas = Object.entries(pontos).map(([nome, valor]) =>
            `<li>${nome}: ${valor} pontos</li>`).join('');
        return `<h4>${data}</h4><ul>${linhas}</ul>`;
    }).join('');
    historicoDiv.innerHTML = html || "<p>Nenhum histórico salvo ainda.</p>";
}

// Sorteio de funções
function sortearFuncoes() {
    let resultado = "";
    let embaralhados = [...membros].sort(() => Math.random() - 0.5);
    funcoes.forEach((funcao, index) => {
        resultado += `${funcao}: ${embaralhados[index]}<br>`;
    });
    document.getElementById("resultadoSorteio").innerHTML = resultado;
}

// Mostrar histórico ao carregar a página
window.onload = exibirHistorico;
