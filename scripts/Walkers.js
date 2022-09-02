import { getWalkers, getCities, getWalkerCities } from "./database.js";

const walkers = getWalkers()
const cities = getCities()
const walkerCities = getWalkerCities()

const filterWalkerCitiesByWalker = (currentWalker) => {
    let walkerAssignments = []
    for (const walkerCity of walkerCities) {
        if (walkerCity.walkerId === currentWalker.id) {
            walkerAssignments.push(walkerCity)
        }
    }
    return walkerAssignments;
}

const assignedCityNames = (walkerAssignments) => {
    let citiesList = '';
    for (const walkerAssignment of walkerAssignments) {
        for (const city of cities) {
            if (walkerAssignment.cityId === city.id) {
                citiesList += `*${city.name} `
            }
        }
    }
    return citiesList;
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id.startsWith("walker")) {
            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const currentCities = filterWalkerCitiesByWalker(walker)
                    const cityNames = assignedCityNames(currentCities)

                    window.alert(`${walker.name} services ${cityNames}`)
                }
            }
        }
    }
)


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>";
    return walkerHTML;
}