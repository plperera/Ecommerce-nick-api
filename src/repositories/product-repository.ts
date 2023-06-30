import { prisma } from "@/config";
import { newCategoryBody } from "@/schemas/category/newCategorySCHEMA";
import { putCategoryBody } from "@/schemas/category/putCategorySCHEMA";

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
    return prisma.product.findFirst({
        where: {
            name: productName
        }
    });
}
async function createCategory({ name }: newCategoryBody){
    return prisma.category.create({
        data: {
            name: name
        }
    });
}
async function putCategory({ name, id }: putCategoryBody){
    return prisma.category.update({
        where: {
            id: id
        },
        data:{
            name: name
        }
    });
}
async function disableCategory(id : number){
    return prisma.category.update({
        where: {
            id: id
        },
        data:{
            isActive: false
        }
    });
}

const productRepository = {
    findAllActive,
    findAllProductsActiveByCategoryId,
    findProductById,
    findByName
}

export default productRepository