import joi from "joi"

export type deleteFavorite = {
    productId: number
}

const deleteFavoriteSCHEMA = joi.object<deleteFavorite>({

    productId: joi.number().required(),

})

export {deleteFavoriteSCHEMA}