// const URL = 'https://pixsly.onrender.com/pixsly'
const URL = 'http://localhost:8080/pixslys'

export const pixslysLoader = async () => {
    const response = await fetch(URL + '/pixslys')
    const pixslys = await response.json()
    console.log(pixslys)
    return pixslys
}