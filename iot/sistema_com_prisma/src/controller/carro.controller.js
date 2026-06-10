import prisma from '../../lib/prisma.js'


const prisma = new PrismaClient()

// const novaMarca = await prisma.carro.createMany({
//     data:{
//         nome: "joao",
//         ano_modelo: "2012",
//         ano_fabricacao: "2014",
//         data_cadastro: "12-01-2015",
//         data_atualizacao: "12-01-2015",
//         ativo: 1
//     }
// })

class CarroControler {
    constructor() {}

    async novaMarca(req, res){
        try {
            const {body}=req
            const marca = await prisma.Marcas.createMany({
                data:{
                    nome: body.nome,
                    ano_modelo: body.ano_modelo,
                    ano_fabricacao: body.ano_fabricacao,
                    data_cadastro: body.data_cadastro,
                    data_atualizacao: body.data_atualizacao,
                    ativo: 1
                },
            })
            return res.status(201).json(marca)
        } catch (error) {
            if (error.code === "P2002") {
                res.status(404).send("Falha ao cadastrar carro")
            }
        }
    }
}


export const carroControler = new CarroControler()