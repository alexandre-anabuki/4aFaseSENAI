
// 1. Crie uma variável para salvar um conjunto de personagens na equipe.
function criarConjuntoPersonagens(personagens) {
    let conjunto = personagens.map(personagem => personagem.toLowerCase());
    console.log('Conjunto inicial: ', conjunto)

    return conjunto
}

// 2. Adicione o Patolino a equipe somente se a equipe tiver 
// menos de 3 membros, e se ele ainda não estiver na equipe.

function adicionarPersonagemPatolino(personagens) {
    if (personagens.length < 3 && !personagens.includes('Patolino')) {
        personagens.push('patolino')
        console.log('Patolino foi adicionado: ', personagens)
    } else {
        console.log('Patolino não foi adicionado.', personagens)
    }
}
// 3. Organize a equipe em ordem alfabética.

function organizarOrdemAlfabetica(personagens) {
    personagens.sort();
    console.log('Lista ordenada: ', personagens)
}

// 4. Coloque o personagem como líder (primeira posição)

function liderPrimeiraPosicao(personagens, lider) {

    //Como eu verifico se tem ou não um líder vindo no parâmetro?
    if (lider) {
        lider = lider.toLowerCase()
    } else {
        lider = 'lanterna-verde'
    }
    for (i = 0; i < personagens.length; i++) {
        personagens[i] = personagens[i].toLowerCase()
    }

    if (personagens.includes(lider)) {
        personagens = personagens.filter(personagem => personagem !== lider);
    }
    personagens.unshift(lider)

    console.log('Líder definido: ', personagens)
    return personagens
}

// 5. Adicione o Frajola, somente se nenhum nome começar com “F” ainda.

function adicionarFrajola(personagens) {
    const existeComF = personagens.some(nome => nome.toLowerCase().startsWith('f'))

    if (!existeComF) {
        personagens.push("frajola")
        console.log("Frajola adicionado: ", personagens)
    } else {
        console.log('Frajola não adicionado, existe personagem com F.')
    }
    console.log(personagens)
}

function montarEquipe(personagens) {
    // 1. Criar uma variável para salvar um conjunto de personagens na equipe.
    let conjunto = criarConjuntoPersonagens(personagens);

    //2. Adicionar o "Patolino" de acordo com as regras.
    adicionarPersonagemPatolino(conjunto);

    //3. Organizar o conjunto em ordem alfabética.
    organizarOrdemAlfabetica(conjunto);

    //4. Colocar um personagem como líder (1º posição).
    conjunto = liderPrimeiraPosicao(conjunto, 'Taz')

    //5. Adicionar 'Frajola' de acordo com as regras.
    adicionarFrajola(conjunto)

    console.log('Conjunto depois da função', conjunto)
}

montarEquipe(['Taz', 'Miranha'])