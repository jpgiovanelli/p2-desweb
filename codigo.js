
const seguir = localStorage.getItem('senha')
const div_primaria = document.getElementById('options')
const div_sec = document.getElementById('options2')

if (seguir == '81dc9bdb52d04dc20036dbd8313ed055'){

    const handle = (e) => {
        let text_value = String(e.target.value) 
        if (text_value == 'Todos') {
            text_value = 'all'
        }
        else {
            text_value = text_value.toLowerCase()
        }
        fetch_api(text_value)

    }

    const header = document.getElementById('header')
    const exit_button = document.createElement('button')
    exit_button.className = 'exit'
    exit_button.innerText = 'Sair'

    exit_button.addEventListener('click', () => {
        localStorage.setItem('senha', '')
        window.location.href = './'
    })

    header.appendChild(exit_button)

    const bt1 = document.createElement('button')
    const bt2 = document.createElement('button')
    const bt3 = document.createElement('button')

    bt1.innerText = 'Masculino'
    bt2.innerText = 'Feminino'
    bt3.innerText = 'Todos'

    bt1.addEventListener('click', () => {
        handle({ target: { value: bt1.innerText } });
    });
    bt2.addEventListener('click', () => {
        handle({ target: { value: bt2.innerText } });
    });
    bt3.addEventListener('click', () => {
        handle({ target: { value: bt3.innerText } });
    });

    div_sec.appendChild(bt1)
    div_sec.appendChild(bt2)
    div_sec.appendChild(bt3)

    const select_ = document.createElement('select') 

    select_.id = 'menuopt'
    select_.className = 'menu'

    var option_ = document.createElement('option')
    option_.text = 'Todos'
    select_.appendChild(option_)

    var option_ = document.createElement('option')
    option_.text = 'Masculino'
    select_.appendChild(option_)

    var option_ = document.createElement('option')
    option_.text = 'Feminino'
    select_.appendChild(option_)

    div_primaria.appendChild(select_)

    const body = document.body
    body.style.display = 'flex'
    body.style.flexDirection = 'column'
    body.style.alignItems = 'center'

    const select = document.getElementById('menuopt')
    select.addEventListener('change', handle)

    const main = (atletas) => {

        const tamanho = atletas.length

        var element = document.getElementById('info')

        for (var i = 0; i < tamanho; i++) {
            var div = document.createElement('article')
            div.id = `atleta ${i}` 

            div.dataset.id = atletas[i].id
            div.dataset.altura = atletas[i].altura
            div.dataset.nome_completo = atletas[i].nome_completo
            div.dataset.nascimento = atletas[i].nascimento

            div.onclick = click

            var tag = document.createElement('p')
            var text = document.createTextNode(atletas[i].nome)
            tag.style.textAlign = 'center'
            tag.appendChild(text)
            div.appendChild(tag)

            var tag2 = document.createElement('img')
            tag2.src = atletas[i].imagem
            tag2.alt = atletas[i].nome
            div.appendChild(tag2)

            var tag3 = document.createElement('p')
            var text = document.createTextNode('Saiba mais')
            tag3.style.textAlign = 'center'
            tag3.appendChild(text)
            div.appendChild(tag3)

            element.appendChild(div)
        }

    }

    const click = (e) => {
        const artigo = e.target.closest('article')
        const id = artigo.dataset.id
    
        window.location.href = `./detalhes.html?id=${id}`
    }

    const variar_texto = async () => {
        try {
            const texto_carregado = document.getElementById('texto carregado');
            if (!texto_carregado) {
                console.error("Element with ID 'texto carregado' not found");
                return;
            }

            let contador = 1;

            setInterval(() => {
                let texto = 'Carregando';

                if (contador === 1) {
                    texto_carregado.innerHTML = texto;
                } else if (contador === 2) {
                    texto_carregado.innerHTML = texto + '.';
                } else if (contador === 3) {
                    texto_carregado.innerHTML = texto + '..';
                } else {
                    texto_carregado.innerHTML = texto + '...';
                }


                contador = contador % 4 + 1; // Volta para 1 quando chega a 3
            }, 60); // Atualiza a cada 500 milissegundos (meio segundo)
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const fetch_api = (page) => {

        var element = document.getElementById('info')

        try {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        } catch (error) {
            
        }

        var carregando = document.createElement('div')
        carregando.id = 'Carregando'
        var h1_carregando = document.createElement('h1')
        h1_carregando.id = 'texto carregado'

        carregando.appendChild(h1_carregando)
        element.appendChild(carregando)

        variar_texto()

        const promise = fetch(`https://botafogo-atletas.mange.li/${page}`)

        promise.then( async (response) => {
                const atletas =  await response.json()
                main(atletas)
                const wait = document.getElementById('Carregando')
                wait.parentNode.removeChild(wait)
            }
        )
    }



    fetch_api('all')
}

else {
    window.location.href = './'
    localStorage.setItem('senha', '')
}


