import React from 'react'
import { useDispatch } from 'react-redux'
import { setCommentOption } from '../../store/features/itemsSlice'

const Comment = () => {
  const commentTextarea = document.getElementById('comment')

  const dispatch = useDispatch()
  const handlerCommentChange = (event) => {
    dispatch(setCommentOption(event.target.value))
  }

  return (
    <div className="comment">
      <p className="comment__text">Комментарий к заказу: </p>

      <textarea
        cols="30"
        rows="10"
        className="comment__textarea"
        id="comment"
        onChange={handlerCommentChange}
        placeholder="Укажите дополнительные пожелания или особенности вашего заказа здесь..."
        wrap="off"
        inputMode="text"
      ></textarea>
    </div>
  )
}

export default Comment
