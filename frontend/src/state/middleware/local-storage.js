export default store => next => action => {
    next(action)
    window.localStorage.setItem('state',JSON.stringify(store.getState()))
}