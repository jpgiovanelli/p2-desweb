
const form = document.getElementById('form')
const button = document.createElement('button')
button.innerText = 'Ir'

button.addEventListener('click', () => {

    const password_text = document.getElementById('password').value

    const md5_password = md5(password_text)
    
    if (md5_password == '81dc9bdb52d04dc20036dbd8313ed055') {
        localStorage.setItem('senha', '81dc9bdb52d04dc20036dbd8313ed055')
        window.location.href = 'logado.html'
    }
    else {
        alert('Senha errada')
    }
    

})

form.appendChild(button)


