import * as ActionTypes from './actionTypes'
import { baseUrl } from '../common/baseUrl'

// export const addComment = (dishId, rating, author, comment) => ({
//   type: ActionTypes.ADD_COMMENT,
//   payload: {
//     dishId: dishId,
//     rating: rating,
//     author: author,
//     comment: comment,
//   }
// })

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true))

  // setTimeout(() => {
  //   dispatch(addDishes(DISHES))
  // }, 2000)
  return fetch(baseUrl + 'dishes')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (error) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: error
})

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
})

export const fetchComments = () => (dispatch) => {    
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComment(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
})

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  }
  newComment.date = new Date().toISOString()
  return fetch(baseUrl + 'comments', {
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        var errmess = new Error(error.message);
        throw errmess;
  })
  .then(response => response.json())
  .then(data => dispatch(addComment(data)))
  .catch(error => {
    console.log('Post Comments ', error.message)
    alert('Your comment could not be posted: ', error.message)
  })
  
}

export const fetchPromos = () => (dispatch) => {
  
  dispatch(promosLoading());

  return fetch(baseUrl + 'promotions')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)))
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
})

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
})

export const fetchLeaders = () => (dispatch) => {
  
  dispatch(leadersLoading());

  return fetch(baseUrl + 'leaders')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
})

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
})

export const fetchFeedbacks = () => (dispatch) => {    
  return fetch(baseUrl + 'feedback')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
    .then(response => response.json())
    .then(feedbacks => dispatch(addFeedback(feedbacks)))
    .catch(error => dispatch(commentsFailed(error.message)))
}

export const addFeedback = (feedback) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: feedback
})

export const postFeedback = (firstname, lastname, phonenumber, email, agree, contactType, message) => (dispatch) => {
  const newFeedback = {
    firstname: firstname,
    lastname: lastname,
    phonenumber: phonenumber,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  }
  newFeedback.date = new Date().toISOString()

  return fetch(baseUrl + 'feedback', {
    method: 'POST',
    body: JSON.stringify(newFeedback),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  error => {
        var errmess = new Error(error.message);
        throw errmess;
  })
  .then(response => response.json())
  .then(data => dispatch(addFeedback(data)))
  .catch(error => {
    console.log('Post Feedback ', error.message)
    alert('Your feedback could not be posted: ', error.message)
  })
  
}