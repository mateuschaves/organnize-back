import express, { Request, Response } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import csvParser from 'csv-parser';
import fs from 'fs';
const app = express();

dotenv.config(); 

const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });



const categories = {
    'Transporte': [],
    'Alimentação': [],
    'Saúde': [],
    'Educação': [],
    'Lazer': [],
    'Outros': [],
    'Casa': [],
    'Taxas': [],
};
const expensesByCategory = {
    'Transporte': 0,
    'Alimentação': 0,
    'Saúde': 0,
    'Educação': 0,
    'Lazer': 0,
    'Outros': 0,
    'Casa': 0,
    'Taxas': 0,
};
const keywordMapping = {
    'UBER': 'Transporte',
    '99': 'Transporte',
    'IFOOD': 'Alimentação',
    'MERCADO': 'Alimentação',
    'PADARIA': 'Alimentação',
    'FARMACIA': 'Saúde',
    'DROGARIA': 'Saúde',
    'HOSPITAL': 'Saúde',
    'ESCOLA': 'Educação',
    'FACULDADE': 'Educação',
    'LIVRARIA': 'Educação',
    'CINEMA': 'Lazer',
    'PARQUE': 'Lazer',
    'TEATRO': 'Lazer',
    'VIAGEM': 'Lazer',
    'LAVANDERIA': 'Casa',
    'TOP': 'Transporte',
    'MARKET4U': 'Alimentação',
    'GRAN  COFFEE': 'Alimentação',
    'KUMA RESTAURANTE': 'Alimentação',
    'SPOLETO': 'Alimentação',
    'BANCOXPSEGUROCAR': 'Taxas',
    'DIGAE': 'Alimentação'
};

function processCSVData(data: any) {
    const { Estabelecimento, Valor } = data;
    for (const keyword in keywordMapping) {
        if (String(Estabelecimento).toUpperCase().includes(keyword)) {
            categories[keywordMapping[keyword]].push(data);
            expensesByCategory[keywordMapping[keyword]] += parseMoneyValueFromCSV(Valor)
        }
    }
}

function parseMoneyValueFromCSV(value: string) {
    const cleanedValue = value.replace('R$', '').replace(',', '.').replace(' ', '');
    const parsedValue = parseFloat(cleanedValue);
    const roundedValue = Math.round(parsedValue * 100) / 100;
    return roundedValue;
}

function handleCSVFile(file: Express.Multer.File, res: Response) {
    file?.path && fs.createReadStream(file?.path)
        .pipe(csvParser({ separator: ';' }))
        .on('data', processCSVData)
        .on('end', () => {
            console.table(expensesByCategory);
            res.send('File uploaded and processed successfully');
        });
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!');
});

app.post('/upload/extract', upload.single('excelFile'), (req: Request, res: Response) => {
    const file = req.file;
    handleCSVFile(file, res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port} 🚀`);
});
