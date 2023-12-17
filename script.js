// Seu código JavaScript aqui

// Função para obter perguntas aleatórias do servidor
async function getRandomQuestions() {
    try {
        const response = await fetch('http://localhost:3000/getRandomQuestions');
        const questions = await response.json();
        // Exibir perguntas na interface (substitua esta parte com sua lógica)
        questions.forEach(question => {
            console.log(question.question);
        });
    } catch (error) {
        console.error('Erro ao obter perguntas:', error);
    }
}

// Chamar a função para obter perguntas aleatórias ao carregar a página
getRandomQuestions();
