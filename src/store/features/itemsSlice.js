import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios'
import { v4 as uuidv4 } from 'uuid'

const initialState = {
  items: [],
  isLoading: false,
  itemInCard: [],
  price: 0,
  discountPrice: 0,
  deliveryType: 'pickup',
  address: null,
  deliveryPrice: 0,
  payMethod: 'cash',
  phone: null,
  comment: null,
}

export const getAllMenu = createAsyncThunk('items/getAllMenu', async () => {
  try {
    const { data } = await axios.get('/getAll')
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
      const newItem = {
        idInCard: uuidv4(),
        ...action.payload,
      }
      state.itemInCard.push(newItem)
      state.price += action.payload.price
      state.discountPrice = state.price * 0.9
    },
    removeItem: (state, action) => {
      const index = state.itemInCard
        .slice()
        .reverse()
        .findIndex((item) => item.id === action.payload.id)
      if (index !== -1) {
        const trueIndex = state.itemInCard.length - 1 - index
        state.price -= state.itemInCard[trueIndex].price
        state.itemInCard.splice(trueIndex, 1)
        state.discountPrice = state.price * 0.9
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
    addSupplement: (state, action) => {
      state.itemInCard = state.itemInCard.map((item) => {
        if (
          action.payload.item?.id === item?.id &&
          action.payload.item?.idInCard === item?.idInCard
        ) {
          const updateItem = {
            ...item,
            modifiers: item.modifiers.map((ell) => {
              if (item.category !== 'Напитки') {
                if (ell.id === action.payload.el.id) {
                  return {
                    ...ell,
                    amount: ell.amount + 1,
                  }
                } else {
                  return ell
                }
              } else {
                if (ell.id === action.payload.el.id) {
                  return {
                    ...ell,
                    amount: ell.amount === 0 ? 1 : 0,
                  }
                } else {
                  return { ...ell, amount: 0 }
                }
              }
            }),
            price: item.price + action.payload.el.price,
          }
          state.price += action.payload.el.price
          state.discountPrice = state.price * 0.9
          return updateItem
        } else {
          return item
        }
      })
    },
    removeSupplement: (state, action) => {
      state.itemInCard = state.itemInCard.map((item) => {
        if (action.payload.item.idInCard === item.idInCard) {
          const index = item.modifiers.findIndex(
            (el) => el.id === action.payload.el.id
          )
          if (index !== -1) {
            const updateItem = {
              ...item,
              modifiers: item.modifiers.map((ell) => {
                if (ell.id === action.payload.el.id) {
                  return {
                    ...ell,
                    amount: ell.amount - 1,
                  }
                } else {
                  return ell
                }
              }),
              price: item.price - action.payload.el.price,
            }
            state.price -= action.payload.el.price
            state.discountPrice = state.price * 0.9
            return updateItem
          }
        }
        return item
      })
    },
    addSnack: (state, action) => {
      state.itemInCard = state.itemInCard.map((item) => {
        if (
          action.payload.curItem?.id === item?.id &&
          action.payload.curItem?.idInCard === item?.idInCard
        ) {
          const updateItem = {
            ...item,
            snack: action.payload.snack,
          }
          return updateItem
        } else {
          return item
        }
      })
    },
    addSause: (state, action) => {
      state.itemInCard = state.itemInCard.map((item) => {
        if (
          action.payload.curItem?.id === item?.id &&
          action.payload.curItem?.idInCard === item?.idInCard
        ) {
          const updateItem = {
            ...item,
            sause: action.payload.snack,
          }
          return updateItem
        } else {
          return item
        }
      })
    },
    deliveryPrice: (state, action) => {
      state.deliveryPrice = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMenu.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllMenu.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
      })
      .addCase(getAllMenu.rejected, (state) => {
        state.isLoading = false
      })
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
  addSupplement,
  removeSupplement,
  addSnack,
  addSause,
  deliveryPrice,
} = itemsSlice.actions

export default itemsSlice.reducer
