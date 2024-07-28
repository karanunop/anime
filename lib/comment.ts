import { prisma } from "./db";

interface commentsProps{
    slug: string
    name: string
    comment: string
}

export async function getComments(slug:string) {
    return await prisma.user.findMany({
        where: { slug },
        orderBy:{publishAt:"asc"}
    })
}

export default async function createComments({slug , name , comment }: commentsProps) {
    return await prisma.user.create({
        data: {
            slug,name,comment
        }
    })
}