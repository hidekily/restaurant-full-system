interface itemsProps{
    id: string,    
    menuItemid: string,
    done: boolean,
    quantity: number,
    unitPrice: number
    menuItem: {
        id: number,
        name: string,
        price: string
    }
}

interface tableProps{
    id: string,
    number: string,
    area: string
}
  
export interface OrderProps{
    id: string,
    tableId: string,
    status: string,
    createdAt: string,
    table: tableProps,
    items: itemsProps[],
  }