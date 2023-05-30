const URL = 'https://zelda-backend.onrender.com'

export const monstersLoader = async () => {
    const response = await fetch(URL + '/monsters')
    const monsters = await response.json()
    console.log(monsters)
    return monsters
}