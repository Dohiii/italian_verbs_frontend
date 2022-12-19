//query selectors
const category = document.getElementById("category")
const czasownik = document.getElementById("czasownik")
const tlumaczenie = document.getElementById("tlumaczenie")
const tense = document.getElementById("tense")
const osoba = document.getElementById("osoba")
const word = document.getElementById("name")


const checkboxes = document.querySelectorAll("input[name=checkbox_char]");
const btnLetter = document.querySelectorAll(".btn-italian-letter");

const submit = document.getElementById("submit")
const new_verb = document.getElementById("new_verb")

// Utils
let checkboxValueChecked = []
let ping = false


// deployed url
// https://italian-verbs.onrender.com
// http://127.0.0.1:3000


// console.log(checkboxValueChecked)

async function renderFunction() {
    let charactersSelected = await getValueCheckbox();
    let categorySelected = await category.value

    const charString = charactersSelected.join("&")

    // console.log(categorySelected)

    charactersSelected.join("")
    if (charactersSelected.length === 0) {
        charactersSelected = `&tense=Presente Indicativo`
    }

    if (categorySelected === "all") {
        categorySelected = ["regularny", "nieregularny"][Math.floor(Math.random() * 2)];
    }

    const url = `https://italian-verbs.onrender.com/api/v1/verbs?categoria=${categorySelected}${charString}`

    // console.log(url)

    const data = await getData(url)
    // console.log(charactersSelected, categorySelected)

    const verb = data.verb

    // console.log(verb)
    const capitalizedVerb =
        verb.czasownik.charAt(0).toUpperCase()
        + verb.czasownik.slice(1)

    czasownik.textContent = capitalizedVerb
    tlumaczenie.textContent = `(${verb.tlumaczenie})`
    tense.textContent = verb.tense
    osoba.textContent = verb.pluc



    // console.log(verb.correctWord)

    if (verb.correctWord.includes(";")) {
        verb.correctWord = verb.correctWord.split(";")
    }

    // console.log(verb.correctWord)




    submit.addEventListener("click", (e) => {

        e.preventDefault()

        const inputetWord = word.value.toLowerCase()



        if (typeof verb.correctWord === "string") {
            if (inputetWord === verb.correctWord) {
                renderFunction()
                word.value = ""
            }
        }


        if (typeof verb.correctWord === "object") {
            if (verb.correctWord.includes(inputetWord)) {
                renderFunction()
                word.value = ""
            }
        }


        if (inputetWord !== correctWord) {
            word.style.borderColor = "red"
        }
    })

    word.style.borderColor = "black"
    showForm()
}


// next function
const getValueCheckbox = async () => {
    let result = [];
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            result.push(`&tense=${checkboxes[i].value}`)
        }
    }
    return result;
}


// selector event listener
category.addEventListener('change', (event) => {
    // const result = document.querySelector('.result');
    // result.textContent = `You like ${event.target.value}`;
    renderFunction()
});


// checkboxes event listener


// Use Array.forEach to add an event listener to each checkbox.
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        checkboxValueChecked =
            Array.from(checkboxes) // Convert checkboxes to an array to use filter and map.
                .filter(i => i.checked) // Use Array.filter to remove unchecked checkboxes.
                .map(i => `&tense=${i}`) // Use Array.map to extract only the checkbox values from the array of objects.
        renderFunction()
    })
});


btnLetter.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        word.value += btn.textContent
    })
})





async function getData(url) {
    const response = await fetch(url)
    // Extract data from response
    const data = await response.json();
    // Handle errors
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return data
}

new_verb.addEventListener("click", e => {
    e.preventDefault()
    renderFunction()
})



const showLoader = () => {
    const loader = document.querySelector(".loader")
    const form = document.querySelector(".form")
    loader.style.display = "block"
    form.style.display = "none"
}

const showForm = () => {
    const loader = document.querySelector(".loader")
    const form = document.querySelector(".form")
    loader.style.display = "none"
    form.style.display = "block"
}


function delay(n) {
    return new Promise(function (resolve) {
        setTimeout(resolve, n * 1000);
    });
}




const pingServer = async () => {
    renderFunction()
    const loader = document.querySelector(".loader")
    const form = document.querySelector(".form")
    loader.style.display = "block"
    form.style.display = "none"
    await delay(10)
    loader.style.display = "none"
    form.style.display = "block"
    renderFunction()
    await delay(10)
    renderFunction()
    await delay(10)
    renderFunction()
    await delay(10)
    renderFunction()
    await delay(10)
    renderFunction()
    await delay(10)
    renderFunction()
    await delay(10)
    renderFunction()
}


try {
    pingServer()

} catch (error) {
    console.log(error)
} finally {
    renderFunction()
}