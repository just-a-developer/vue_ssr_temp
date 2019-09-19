function getCssLoaders(loaders, option) {
    return loaders.map(item => {
        return {
            loader: `${item}-loader`,
            options: Object.assign({}, option)
        }
    })
}

function generateLoader(name, option) {
    return {
        loader: `${name}-loader`,
        options: Object.assign({}, option)
    }
}

exports.getCssLoaders = getCssLoaders
exports.generateLoader = generateLoader