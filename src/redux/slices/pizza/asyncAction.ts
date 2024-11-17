import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Pizza } from "./types"
import { SearchPizzaParams } from "../cart/types"

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
      const { order, sortBy, category, search, currentPage } = params
      const { data } = await axios.get(
        `https://66fab3a48583ac93b4098801.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      return data
    }
  )