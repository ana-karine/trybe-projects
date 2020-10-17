document.getElementById('button-login').addEventListener('click', function () {
  alert(document.getElementById('user-email-phone').value);
});

document.getElementById('button-login2').addEventListener('click', function () {
  alert(document.getElementById('user-email-phone2').value);
});

document.getElementById('facebook-create').addEventListener('click', function () {
  const showRightContent2 = document.querySelector('.main-content2');
  const deleteContent = document.querySelector('.facebook-login-mobile');
  const btn = document.getElementById('facebook-create');
  showRightContent2.className = 'display: unset';
  deleteContent.className += ' hidden';
  btn.className += ' hidden';
});

const inputsRadios = document.getElementsByClassName('radio');
const inputGenderCustom = document.querySelector('#selected-gender');
const inputsRadios2 = document.getElementsByClassName('radio2');
const inputGenderCustom2 = document.querySelector('#selected-gender2');

for (let i = 0; i < inputsRadios.length; i += 1) {
  inputsRadios[i].addEventListener('click', function () {
    inputGenderCustom.value = document.querySelector('input:checked').value;
    if (inputGenderCustom.value === 'Personalizado') {
      inputGenderCustom.classList.toggle('hidden');
      inputGenderCustom.value = '';
    }
  });
}

for (let i = 0; i < inputsRadios2.length; i += 1) {
  inputsRadios2[i].addEventListener('click', function () {
    inputGenderCustom2.value = document.querySelector('input:checked').value;
    if (inputGenderCustom2.value === 'custom') {
      inputGenderCustom2.classList.toggle('hidden');
      inputGenderCustom2.value = '';
    }
  });
}

function replaceRightContent() {
  const userDatas = {
    name: document.querySelector('#first-name').value,
    lastName: document.querySelector('#last-name').value,
    email: document.querySelector('#user-email').value,
    birth: document.querySelector('#user-birthdate').value,
    gender: document.querySelector('#selected-gender').value,
  };
  const righContent = document.querySelector('.right-content').childNodes;
  righContent.forEach(function (element) {
    element.className += ' hidden';
  });
  document
    .querySelector('.right-content')
    .appendChild(document.createElement('section'));

  document.querySelector('section').innerText = `
    Olá, ${userDatas.name} ${userDatas.lastName}
    Email: ${userDatas.email}
    Aniversário: ${userDatas.birth}
    Gênero: ${userDatas.gender}
    `;
}

function replaceRightContent2() {
  const userDatas2 = {
    name: document.querySelector('#first-name2').value,
    lastName: document.querySelector('#last-name2').value,
    email: document.querySelector('#user-email2').value,
    birth: document.querySelector('#user-birthdate2').value,
    gender: document.querySelector('#selected-gender2').value,
  };
  const righContent2 = document.querySelector('.right-content2').childNodes;
  righContent2.forEach(function (element) {
    element.className += ' hidden';
  });
  document
    .querySelector('.right-content2')
    .appendChild(document.createElement('section'));

  document.querySelector('section').innerText = `
    Olá, ${userDatas2.name} ${userDatas2.lastName}
    Email: ${userDatas2.email}
    Aniversário: ${userDatas2.birth}
    Gênero: ${userDatas2.gender}
    `;
}

function invalidToIfields() {
  document.getElementById('invalid-fields').innerText = 'Campos inválidos';
}

function invalidToIfields2() {
  document.getElementById('invalid-fields2').innerText = 'Campos inválidos';
}

function checkInputRadios() {
  let isCheked = 0;
  const lookInputsRadios = document.getElementsByClassName('radio');
  for (let i = 0; i < lookInputsRadios.length; i += 1) {
    if (lookInputsRadios[i].checked) {
      isCheked += 1;
    }
  }
  if (isCheked === 1) {
    replaceRightContent();
  } else {
    invalidToIfields();
  }
  return isCheked;
}

function checkInputRadios2() {
  let isCheked2 = 0;
  const lookInputsRadios2 = document.getElementsByClassName('radio2');
  for (let i = 0; i < lookInputsRadios2.length; i += 1) {
    if (lookInputsRadios2[i].checked) {
      isCheked2 += 1;
    }
  }
  if (isCheked2 === 1) {
    replaceRightContent2();
  } else {
    invalidToIfields2();
  }
  return isCheked2;
}

const inputIsEmpty = document.getElementsByClassName('input-data');
function checkInputDatas() {
  let isEmpty = 0;
  for (let i = 0; i < inputIsEmpty.length; i += 1) {
    if (inputIsEmpty[i].value === '') {
      isEmpty += 1;
    }
  }
  if (isEmpty === 0) {
    checkInputRadios();
  } else {
    invalidToIfields();
  }
  return isEmpty;
}

const inputIsEmpty2 = document.getElementsByClassName('input-data2');
function checkInputDatas2() {
  let isEmpty2 = 0;
  for (let i = 0; i < inputIsEmpty2.length; i += 1) {
    if (inputIsEmpty2[i].value === '') {
      isEmpty2 += 1;
    }
  }
  if (isEmpty2 === 0) {
    checkInputRadios2();
  } else {
    invalidToIfields2();
  }
  return isEmpty2;
}

document
  .querySelector('#facebook-register')
  .addEventListener('click', function (event) {
    event.preventDefault();
    checkInputDatas();
  });

document
  .querySelector('#facebook-register2')
  .addEventListener('click', function (event) {
    event.preventDefault();
    checkInputDatas2();
  });
