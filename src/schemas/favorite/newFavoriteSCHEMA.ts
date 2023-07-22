import joi from "joi"

export type newFavorite = {
    productId: number
}

const newFavoriteSCHEMA = joi.object<newFavorite>({

    productId: joi.number().required(),

})

export {newFavoriteSCHEMA}