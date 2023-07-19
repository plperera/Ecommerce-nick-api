import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";

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
type CategoriesProductBody = { 
    productId: number, 
    categoryId: number
}[]

type ImagesProductBody = { 
    imageId: number, 
    productId: number,
    mainImage: boolean
}[]

type tecnicDetailsBody = { 
    productId: number,
    topic: string,
    topicDetail: string
}[]

async function findAllActive(){
    return prisma.product.findMany({
        where: {
            isActive: true
        },
        orderBy: {
            salesAmount: 'desc'
        },
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
    });
}
async function findAllProductsActiveByCategoryId(categoryId: number){
    return prisma.product.findMany({
        where: {
            isActive: true,
            productCategory: {
                some: {
                    categoryId: categoryId
                }
            }
        },
        orderBy: {
            salesAmount: 'desc'
        },
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
    });
}
async function findProductById(productId: number){
    return prisma.product.findUnique({
        where: {
            id: productId,
        },
        select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
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
    });
}
async function findByName(productName: string){
    return prisma.product.findUnique({
        where: {
            name: productName,
        },
        select: {
        id: true,
        name: true,
        description: true,
        price: true,
        isActive: true,
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
    });
}
async function createProduct(body: productBody){
    return prisma.product.create({
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            stock: body.stock
        }
    });
}
async function createManyTecnicDetails(body: tecnicDetailsBody){
    return prisma.tecnicDetails.createMany({
        data: body
    });
}
async function createManyCategoriesProduct(body: CategoriesProductBody){
    return prisma.productCategory.createMany({
        data: body
    });
}
async function createManyImagesProduct(body: ImagesProductBody){
    return prisma.productImage.createMany({
        data: body
    });
}
async function deleteManyTecnincDetails(productId: number){
    return prisma.tecnicDetails.deleteMany({
        where: {
            productId: productId
        }
    });
}
async function deleteManyCategoriesProduct(productId: number){
    return prisma.productCategory.deleteMany({
        where: {
            productId: productId
        }
    });
}
async function deleteManyImagesProduct(productId: number){
    return prisma.productImage.deleteMany({
        where: {
            productId: productId
        }
    });
}
async function putProduct(body: Omit<putProductBody, "categories" | "images" | "tecnicDetails">){
    return prisma.product.update({
        where:{
            id: body.id
        },
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            stock: body.stock,
            salesAmount: body.salesNumber
        }
    });
}
async function disableProduct(id: number){
    return prisma.product.update({
        where:{
            id: id
        },
        data: {
            isActive: false
        }
    });
}

const productRepository = {
    findAllActive,
    findAllProductsActiveByCategoryId,
    findProductById,
    findByName,
    createManyTecnicDetails,
    createManyCategoriesProduct,
    createManyImagesProduct,
    createProduct,
    deleteManyCategoriesProduct,
    deleteManyImagesProduct,
    deleteManyTecnincDetails,
    putProduct,
    disableProduct
}

export default productRepository