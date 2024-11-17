// сокращаем типизацию одинаковых значений на Record (order, sortBy, category, search, currentPage)
// type FetchPizzasArgs = Record<string, string>

export type Pizza = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: number[]
  types: number[]
  rating: number
}

// enum - определяет набор именованных констант, организованных в коллекцию
export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
export interface PizzasSliceState {
  items: Pizza[]
  status: Status
}
