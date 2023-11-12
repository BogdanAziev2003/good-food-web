import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'

const initialState = {
  items: [],
  isLoading: false,
  errorMessage: null,
  itemInCard: [],
  price: 0,
  deliveryType: null,
  address: null,
  payMethod: null,
  phone: null,
  comment: null,
}

export const getAllMenu = createAsyncThunk('items/getAllMenu', async () => {
  try {
    const { data } = await axios.get('/get-all')
    return data
  } catch (error) {
    console.log(error)
  }
})

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.itemInCard.push(action.payload)
      state.price += action.payload.price
    },
    removeItem: (state, { payload }) => {
      const index = state.itemInCard.indexOf(
        state.itemInCard.find((item) => item.id === payload.id)
      )
      if (index !== -1) {
        state.itemInCard.splice(index, 1)
        state.price -= payload.price
      }
    },
    // Запись адресса
    setClientAddress: (state, action) => {
      state.address = action.payload
    },
    // Тип доставики
    setSelectedOption: (state, action) => {
      state.deliveryType = action.payload
    },
    // Тип Оплаты
    setPayOption: (state, action) => {
      state.payMethod = action.payload
    },
    // Номер телефона
    setPhoneOption: (state, action) => {
      state.phone = action.payload
    },
    // Коментарий
    setCommentOption: (state, action) => {
      state.comment = action.payload
    },
  },
  extraReducers: {
    // Get All Menu
    [getAllMenu.pending]: (state) => {
      state.isLoading = true
      state.errorMessage = null
    },
    [getAllMenu.fulfilled]: (state, action) => {
      state.isLoading = false
      state.items = action.payload.items
      state.errorMessage = null
    },
    [getAllMenu.rejected]: (state, action) => {
      state.errorMessage = action.payload.message
      state.isLoading = false
    },
  },
})

export const {
  addItem,
  removeItem,
  setSelectedOption,
  setClientAddress,
  setPayOption,
  setPhoneOption,
  setCommentOption,
} = itemsSlice.actions

export default itemsSlice.reducer
