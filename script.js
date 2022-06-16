const btnSend = document.querySelector('.btn-send');
const resultMsg = document.getElementById('result-msg');
const errMsg = document.querySelector('.error-msg');
const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const getCode = (arrWord) => {
  const regexVowels = /[aeiouy]/;
  let arrWordsMached = [];
  arrWord.forEach((item) => {
    if (item.length >= 5 && item.length <= 7) {
      if (regexVowels.test(item.toLowerCase().slice(-1))) {
        let nextLetterMatchedCode =
          alphabet[alphabet.indexOf(item.toLowerCase().slice(0, 1)) + 1];
        if (item.toLowerCase().slice(1, 2) === nextLetterMatchedCode) {
          arrWordsMached.push(item);
        }
      }
    }
  });
  return arrWordsMached;
};

const isValideListWords = (arr) => {
  const regexletter = /[^a-zA-Z-]/g;
  let err = '';
  if (arr.length < 10) err = 'La liste de mots doit contenir plus de 10 mots';
  arr.forEach((item) => {
    item.length > 20 && (err = 'Un mot ne doit pas dépasser 20 caractères');
    item.length < 2 && (err = 'Un mot doit être supérieur à 1 caractère');
    regexletter.test(item) && (err = `Présence de mot incorrect : "${item}"`);
  });

  if (err) {
    errMsg.classList.remove('d-none');
    errMsg.textContent = err;
    return false;
  } else {
    errMsg.classList.add('d-none');
    return true;
  }
};

const handleStringInput = () => {
  resultMsg.innerText = '';
  resultMsg.classList.remove('active');
  const listWords = document.querySelector('#list-words');
  const arrWords = listWords.value.split(' ');
  const arrWordsFiltered = arrWords.filter((value) => value !== '');
  //   console.log('arrWordsFiltered', arrWordsFiltered);

  if (isValideListWords(arrWordsFiltered)) {
    let arrCodeFound = getCode(arrWordsFiltered);
    // console.log('arrCodeDound', arrCodeFound);
    displayResult(arrCodeFound);
  }
};

const displayResult = (arrWords) => {
  if (arrWords.length > 0) {
    resultMsg.classList.remove('text-danger');
    resultMsg.classList.add('text-success');
    arrWordMatched = [...new Set(arrWords)];
    qtyWordMatched = arrWordMatched.length;
    sentenceResult =
      arrWordMatched.length > 1
        ? 'Mots magiques trouvés'
        : 'Mot magique trouvé';
    setTimeout(() => {
      resultMsg.classList.add('active');
    }, 600);

    resultMsg.innerText = `Nombre de mot magique trouvé: ${qtyWordMatched} \n${sentenceResult}: ${arrWordMatched.join(
      ', '
    )}`;
  } else {
    setTimeout(() => {
      resultMsg.classList.add('active');
    }, 600);
    resultMsg.classList.remove('text-success');
    resultMsg.classList.add('text-danger');

    resultMsg.innerText =
      "Aucun mot magique \nn'a été trouvé dans votre liste 😭";
  }
};

btnSend.addEventListener('click', handleStringInput);
