import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";

export type productCartBodyResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
    productImage: {
        mainImage: boolean;
        image: {
            imageUrl: string;
        };
    }[];
}[]
export type productBodyResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
    productCategory: {
        category: {
            id: number;
            name: string;
        };
    }[];
    productImage: {
        mainImage: boolean;
        image: {
            imageUrl: string;
        };
    }[];
    tecnicDetails: {
        topic: string,
        topicDetail: string
    }[]
}[]
export type productAdminBodyResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number,
    productCategory: {
        category: {
            id: number;
            name: string;
        };
    }[];
    productImage: {
        mainImage: boolean;
        image: {
            imageUrl: string;
            imageName: string,
            id: number
        };
    }[];
    tecnicDetails: {
        topic: string,
        topicDetail: string
    }[]
}[]
export type productUniqueBodyResponse = {
    productId: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean,
    categories: {
        categoryId: number;
        name: string;
    }[];
    images: {
        mainImage: boolean;
        imageUrl: string;
    }[];
    tecnicDetails: {
        topic: string,
        topicDetail: string
    }[]
};

async function findAllFavoritesProductsData(userId: number){
    return prisma.productFavorite.findMany({
        where: {
            userId: userId
        },
        select: {
            product: {
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    tecnicDetails: {
                        select: {
                            topic: true,
                            topicDetail: true,
                        }
                    },
                    productCategory: {
                        select: {
                            category: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    },
                    productImage: {
                        select: {
                            mainImage: true,
                            image: {
                                select: {
                                    imageUrl: true
                                }
                            }
                        }
                    }
                }
            }  
        }
    })
}
async function findFavoriteByProductIdAndUserId({userId, productId}:{userId: number, productId: number}) {
    return prisma.productFavorite.findFirst({
        where: {
            userId: userId,
            productId: productId
        }
    })
}
async function createNewFavorite({userId, productId}:{userId: number, productId: number}) {
    return prisma.productFavorite.create({
        data: {
            userId: userId,
            productId: productId
        }
    })
}
async function removeFavoriteProduct(favoriteId: number) {
    return prisma.productFavorite.delete({
        where: {
            id: favoriteId
        }
    })
}


const favoriteRepository = {
    findAllFavoritesProductsData,
    findFavoriteByProductIdAndUserId,
    createNewFavorite,
    removeFavoriteProduct
}

export default favoriteRepository