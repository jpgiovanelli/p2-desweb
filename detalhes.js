const parametros = window.location.search

const id = new URLSearchParams(parametros).get('id')

const seguir = localStorage.getItem('senha')
const div_primaria = document.getElementById('detalhes')

if (seguir == '81dc9bdb52d04dc20036dbd8313ed055'){

    const main = (atletas) => {

        var linha1 = document.createElement('div')
        linha1.id = 'row1'

        
        var nome = document.createElement('h1')
        var text = `${atletas.nome_completo} - ${atletas.posicao[0].toUpperCase() + atletas.posicao.slice(1)}`
        nome.innerText = text

        div_primaria.appendChild(nome)
        
        var tag_img = document.createElement('img')
        tag_img.src = atletas.imagem

        div_primaria.appendChild(tag_img)

        var div_aux = document.createElement('div')
        div_aux.className = 'bloco1'

        var aux_text = document.createElement('p')
        aux_text.id = 'aux_text'
        aux_text.innerText = 'Nascimento'
        var nascimento = document.createElement('p')
        var text = atletas.nascimento
        nascimento.innerText = text

        div_aux.appendChild(aux_text)
        div_aux.appendChild(nascimento)
        linha1.appendChild(div_aux)
        div_primaria.appendChild(linha1)

        var div_aux = document.createElement('div')
        div_aux.className = 'bloco2'
        
        var aux_text = document.createElement('p')
        aux_text.id = 'aux_text'
        aux_text.innerText = 'Altura'
        var altura = document.createElement('p')
        var text = atletas.altura
        altura.innerText = text

        div_aux.appendChild(aux_text)
        div_aux.appendChild(altura)
        linha1.appendChild(div_aux)

        var div_aux = document.createElement('div')
        div_aux.className = 'bloco3'

        var aux_text = document.createElement('p')
        aux_text.id = 'aux_text'
        aux_text.innerText = 'Descrição'
        var detalhe = document.createElement('p')
        detalhe.innerText = atletas.descricao

        div_aux.appendChild(aux_text)
        div_aux.appendChild(detalhe)
        div_primaria.appendChild(div_aux)

        const button = document.createElement('button')
        button.innerText = 'Voltar'

        button.addEventListener('click', () => {
            window.location.href = 'logado.html'
        })

        div_primaria.appendChild(button)
        
    }

    const fetch_api = (id) => {

        const promise = fetch(`https://botafogo-atletas.mange.li/${id}`)

        promise.then( async (response) => {
                const atletas =  await response.json()
                main(atletas)
            }
        )
    }

    fetch_api(id)


}
else {
    window.location.href = './'
    localStorage.setItem('senha', '')
}