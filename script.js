const elements = ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne", "Na", "Mg", "Al", "Si", "P", "S", "Cl", "Ar", "K", "Ca", "Sc", "Ti", "V", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Y", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "I", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "W", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"]
const offsetIdentifiers = ["A", "B"]

document.addEventListener("DOMContentLoaded", () => {
    let plainText = document.getElementById("decrapted")
    let encraptedText = document.getElementById("encrapted")
    let doEncrapt = document.getElementById("buttonencrapt")
    let doDecrapt = document.getElementById("buttondecrapt")

    doEncrapt.addEventListener("mousedown", () => {
        encraption(plainText.value).then((text) => {
            encraptedText.value = text
        })
    })

    doDecrapt.addEventListener("mousedown", () => {
        plainText.value = decraption(encraptedText.value)
    })
})

const getRandomOrgNumber = async (num, min, max, col, base) => {
    const response = await fetch(`https://www.random.org/integers/?num=${num}&min=${min}&max=${max}&col=${col}&base=${base}&format=plain&rnd=new`)
    return parseInt(await response.text())
}

const encraption = async (text) => {
    return Promise.all(
        text.split("").map(async (char) => {
            if (char === " ") return "||"

            let filteredElements = elements.filter(el => el.toLowerCase().includes(char.toLowerCase()),)
            let randomIndex = await getRandomOrgNumber(1, 0, filteredElements.length - 1, 1, 10)
            let element = filteredElements[randomIndex]
            if (!element) return char

            let elementNumber = elements.indexOf(element) + 1
            let identifier = element.length === 1 ? "" : offsetIdentifiers[element.toLowerCase().indexOf(char.toLowerCase())]
            
            return `${identifier}${elementNumber}`
        })
    ).then((array) => array.join(" "))
}

const decraption = (text) => {
    return text.split(" ").map((code) => {
            if (code === "||") return " "

            let elementNumber = code.match(/[0-9]+/)
            if (!elementNumber) return code

            let element = elements[elementNumber[0] - 1]

            if (element.length !== 1) {
                let offset = offsetIdentifiers.indexOf(code.substr(0, 1))
                return element.substr(offset, 1)
            }

            return element
        }).join("").toUpperCase()
}