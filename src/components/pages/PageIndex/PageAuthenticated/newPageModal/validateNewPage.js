export const validateNewPage = (newPage) => {
    let validation = {
        isValid: true,
        title: '',
        desc: ''
    }

    if (newPage.title.length < 1) {
        validation.isValid = false
        validation.title = 'Agrega un título'
        validation.desc = 'Debes rellenar todos los espacios'
        return validation
    }
    if (newPage.category.length < 1) {
        validation.isValid = false
        validation.title = 'Agrega una categoría'
        validation.desc = 'Debes rellenar todos los espacios'
        return validation
    }
    return validation
}