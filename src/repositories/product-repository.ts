import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";
import { categoriesArray, productBody } from "@/schemas/product/createProductSCHEMA";

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
}[]

export type productUniqueBodyResponse = {
    productId: number;
    name: string;
    description: string;
    price: number;
    categories: {
      categoryId: number;
      name: string;
    }[];
    images: {
      mainImage: boolean;
      image: File;
    }[];
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
            id: productId
        },
        select: {
        id: true,
        name: true,
        description: true,
        price: true,
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
            name: productName
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

const productRepository = {
    findAllActive,
    findAllProductsActiveByCategoryId,
    findProductById,
    findByName,
    createManyCategoriesProduct,
    createManyImagesProduct,
    createProduct
}

export default productRepository