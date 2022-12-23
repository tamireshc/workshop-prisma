// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// // A `main` function so that you can use async/await
// async function main() {
//   console.log('teste')
//   // await prisma.user.create({
//   //   data: {
//   //     name: "jao",
//   //     email: "jao2xx@gmail.com",
//   //     post: {
//   //       create: {
//   //         title: 'post casado'
//   //       }
//   //     }
//   //   }
//   // })
//   await prisma.user.update({
//     data: {
//       name: 'luiz'
//     },
//     where: {
//       id: 2
//     }
//   })
//   const result = await prisma.user.findMany({
//     where: {
//       name: {
//         startsWith: 'j'
//       }
//     }

//   })
//   console.log(result)
//   await prisma.post.create({
//     data: {
//       title: 'hellow word',
//       authorId: 2
//     }
//   })
//   const allPosts = await prisma.post.findMany()
//   console.log('posts', allPosts)

//   const findUser2 = await prisma.user.findUnique({
//     where: {
//       id: 2
//     }
//   })
//   console.log('finduser2', findUser2)


// }

// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
