function checkTest(rbIds) {
    for (let i = 1; i <= rbIds.length; i++) {
        let result = document.querySelector(`#res-${i}`);
        if (document.querySelector(`#${window.atob(rbIds[i-1])}`).checked) {
            result.classList.remove('wrong');
            result.classList.add('correct');
            result.textContent = 'Правильно';
        } else {
            result.classList.remove('correct');
            result.classList.add('wrong');
            result.textContent = 'Неправильно';
        }  
    }
    document.querySelector("#theoryLink").hidden = false;
    document.querySelector("#mainLink").hidden = false;
}

