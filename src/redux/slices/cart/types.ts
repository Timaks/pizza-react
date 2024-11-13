export type CartItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  size: number
  type: string
  count: number
}
//type - можем передать что угодно, {}, number, string[]... а interface(чаще для state)-типизирует ТОЛЬКО объект

export interface cartSliceState {
  totalPrice: number
  items: CartItem[]
}
