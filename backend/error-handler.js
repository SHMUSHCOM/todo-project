export default function(f){
    return async function(request, response, next){
        try {
            f(request, response)
        } catch (error) {
            next(error)
        }
    }
}