import { z } from 'zod';

const DataItemSchema = z.object({
  name: z.string(),
  caixa: z.number().min(1),
});

const DataListSchema = z.array(DataItemSchema);

const valor = 1000.50;

const rawData = [
  { name: '1', caixa: valor },
  { name: '2', caixa: valor},
    { name: '3', caixa: 2005 },
    { name: '4', caixa: 245 },
    { name: '5', caixa: 5000 },
    { name: '6', caixa: 1500 },
    { name: '7', caixa: valor },
    { name: '8', caixa: 4650 },
    { name: '9', caixa: 10000 },
    { name: '10', caixa: 7020 },
    { name: '11', caixa: 3250 },
    { name: '12', caixa: 5259 },
    { name: '13', caixa: 8400 },
    { name: '14', caixa: 8422 },
    { name: '15', caixa: 7209 },
    { name: '16', caixa: 1230 },
    { name: '17', caixa: 3727 },
    { name: '18', caixa: 12543 },
    { name: '19', caixa: 10000 },
    { name: '20', caixa: 11430 },
    { name: '21', caixa: 7650 },
    { name: '22', caixa: 4390 },
    { name: '23', caixa: 3000 },
    { name: '24', caixa: 6692 },
    { name: '25', caixa:valor },
    { name: '26', caixa:9000},
    { name: '27', caixa: 1901 },
    { name: '28', caixa: valor },
    { name: '29', caixa: 15000 },
    { name: '30', caixa: valor },
];

export const validatedData = DataListSchema.parse(rawData);