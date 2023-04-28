export default function (context) {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('token')) {
            console.log(context)
            // context.store.
        }
        
    }
    console.log(context)
}