import { prisma } from "@/config";
import { productBody } from "@/schemas/product/createProductSCHEMA";
import { putProductBody } from "@/schemas/product/putProductSCHEMA";

export type productCartBodyResponse = {
    id: number;
    name: string;
    description: string;
    price: number;
    highPrice: number,
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
    highPrice: number,
    stock: number;
    productSubCategory: {
        subCategory: {
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
    highPrice: number,
    stock: number,
    isActive: boolean,
    productSubCategory: {
        subCategory: {
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
type SubCategoriesProductBody = { 
    productId: number, 
    subCategoryId: number
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

async function findAll(){
    return prisma.product.findMany({
        orderBy: {
            salesAmount: 'desc'
        },
        select: {
            id: true,
            stock: true,
            name: true,
            description: true,
            price: true,
            highPrice: true,
            isActive: true,
            tecnicDetails: {
                select: {
                    topic: true,
                    topicDetail: true,
                }
            },
            productSubCategory: {
                select: {
                    subCategory: {
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
                            imageUrl: true,
                            imageName: true,
                            id: true,
                        }
                    }
                }
            }
        }     
    });
}
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
            highPrice: true,
            stock: true,
            tecnicDetails: {
                select: {
                    topic: true,
                    topicDetail: true,
                }
            },
            productSubCategory: {
                select: {
                    subCategory: {
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
async function findAllActiveById(productIdArray: {productId: number}[]){
    return prisma.product.findMany({
        where: {
            isActive: true,
            id: {
                in: productIdArray.map(e => e.productId)
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
            highPrice: true,
            stock: true,
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
async function findAllProductsActiveByCategoryId(subCategoryId: number){
    return prisma.product.findMany({
        where: {
            isActive: true,
            productSubCategory: {
                some: {
                    subCategoryId: subCategoryId
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
            highPrice: true,
            stock: true,
            tecnicDetails: {
                select: {
                    topic: true,
                    topicDetail: true,
                }
            },
            productSubCategory: {
                select: {
                    subCategory: {
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
        highPrice: true,
        stock: true, 
        isActive: true,
        tecnicDetails: {
            select: {
                topic: true,
                topicDetail: true,
            }
        },
        productSubCategory: {
            select: {
                subCategory: {
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
        highPrice: true,
        stock: true,
        isActive: true,
        tecnicDetails: {
            select: {
                topic: true,
                topicDetail: true,
            }
        },
        productSubCategory: {
            select: {
                subCategory: {
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
            stock: body.stock,
            highPrice: body.highPrice
        }
    });
}
async function createManyTecnicDetails(body: tecnicDetailsBody){
    return prisma.tecnicDetails.createMany({
        data: body
    });
}
async function createManyCategoriesProduct(body: SubCategoriesProductBody){
    return prisma.productSubCategory.createMany({
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
async function deleteManySubCategoriesProduct(productId: number){
    return prisma.productSubCategory.deleteMany({
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
async function putProduct(body: Omit<putProductBody, "subCategories" | "images" | "tecnicDetails">){
    return prisma.product.update({
        where:{
            id: body.id
        },
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
            stock: body.stock,
            highPrice: body.highPrice
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
async function enableProduct(id: number){
    return prisma.product.update({
        where:{
            id: id
        },
        data: {
            isActive: true
        }
    });
}

const productRepository = {
    findAll,
    findAllActive,
    findAllActiveById,
    findAllProductsActiveByCategoryId,
    findProductById,
    findByName,
    createManyTecnicDetails,
    createManyCategoriesProduct,
    createManyImagesProduct,
    createProduct,
    deleteManySubCategoriesProduct,
    deleteManyImagesProduct,
    deleteManyTecnincDetails,
    putProduct,
    disableProduct,
    enableProduct
}

export default productRepository