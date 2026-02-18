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
  
export interface OrderProps{
    id: string,
    tableId: string,
    status: string,
    createdAt: string,
    items: itemsProps[],
  }