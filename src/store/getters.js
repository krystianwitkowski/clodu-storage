export default {
    searchFiles: (state) => (cb) => {
    return state.files.filter(cb).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj }).filter(file => file.file.name.includes(state.search))
    },
    files: (state) => (cb) => {
    return state.files.filter(cb).map((obj, i) => typeof i === "number" ? {...obj, file: JSON.parse(obj.file)} : { ...obj });
    },
    bytes: (state) => {
    const sizesFile = state.files.map(file => JSON.parse(file.file)).map(file => file.size);
    return sizesFile.reduce((accumulator, currentSize) => accumulator + currentSize, 0)
    }
}