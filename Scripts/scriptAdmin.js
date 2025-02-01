var signUpList = [];
var count = 0;

// Função para adicionar um novo cadastro
function addSignUp(date, username, email) {
    
    const newSignUp = { id: count, date: date, username: username, email: email };
    signUpList.push(newSignUp);
    localStorage.setItem('signUpList', JSON.stringify(signUpList)); 
    renderSignUpList();
    count++;
}   

// Função para excluir um cadastro
function deleteSignUp(signUpId) {
    const updatedSignUpList = signUpList.filter(function (signup) {
      return signup.id !== signUpId;
    });
  
    if (updatedSignUpList.length < signUpList.length) {
      signUpList = updatedSignUpList;
      localStorage.setItem('signUpList', JSON.stringify(signUpList)); 
      renderSignUpList();
    } else {
      alert('Cadastro não encontrado.');
    }
}

// Função para recuperar a lista de cadastros do localStorage
function getSignUpList() {
    const storedList = JSON.parse(localStorage.getItem('signUpList'));
    signUpList = storedList || [];
}

// Função para renderizar a lista de cadastros no HTML
function renderSignUpList() {
    
    const signUpListElement = document.getElementById("signUpList");
    signUpListElement.innerHTML = "";

    signUpList.forEach(function (signup) {
        
        const listItem = document.createElement("li");
        listItem.innerHTML = 
            '<span class="description">' + signup.date +'  |  ' + signup.username + '  |  ' + signup.email + '</span> <button class="delete-button" onclick="deleteSignUp('+ signup.id +')">X</button>';
        signUpListElement.appendChild(listItem);
    });
}


// Recuperar a lista de cadastros do localStorage
getSignUpList();

// Renderizar a lista de cadastros no HTML
renderSignUpList();

// Event listener para o formulário de cadastro de usuários
document.getElementById('signUpForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const dateInput = document.getElementById('dateInput');
    const usernameInput = document.getElementById('usernameInput');
    const emailInput = document.getElementById('emailInput');
    addSignUp(dateInput.value, usernameInput.value, emailInput.value);
    renderSignUpList();
    dateInput.value = '';
    usernameInput.value = '';
    emailInput.value = '';
});


// Adiciona um event listener para o clique no botão de excluir todos
document.getElementById('delete-all-button').addEventListener('click', function(event) {

    event.preventDefault();
    signUpList = [];
    localStorage.removeItem('signUpList');
    renderSignUpList();
});
