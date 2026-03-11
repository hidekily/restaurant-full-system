import { z } from 'zod';

const DataItemSchema = z.object({
  name: z.string(),
  revenue: z.number().min(1),
});

const DataListSchema = z.array(DataItemSchema);

const valor = 1000.50;

const rawData = [
  { name: '1', revenue: valor },
  { name: '2', revenue: valor},
    { name: '3', revenue: 2005 },
    { name: '4', revenue: 245 },
    { name: '5', revenue: 5000 },
    { name: '6', revenue: 1500 },
    { name: '7', revenue: valor },
    { name: '8', revenue: 4650 },
    { name: '9', revenue: 10000 },
    { name: '10', revenue: 7020 },
    { name: '11', revenue: 3250 },
    { name: '12', revenue: 5259 },
    { name: '13', revenue: 8400 },
    { name: '14', revenue: 8422 },
    { name: '15', revenue: 7209 },
    { name: '16', revenue: 1230 },
    { name: '17', revenue: 3727 },
    { name: '18', revenue: 12543 },
    { name: '19', revenue: 10000 },
    { name: '20', revenue: 11430 },
    { name: '21', revenue: 7650 },
    { name: '22', revenue: 4390 },
    { name: '23', revenue: 3000 },
    { name: '24', revenue: 6692 },
    { name: '25', revenue:valor },
    { name: '26', revenue:9000},
    { name: '27', revenue: 1901 },
    { name: '28', revenue: valor },
    { name: '29', revenue: 15000 },
    { name: '30', revenue: valor },
];

export const validatedData = DataListSchema.parse(rawData);