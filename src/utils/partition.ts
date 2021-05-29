export const partition = <T,>(array: Array<T>, fn: (v: T) => boolean) => {


    return array.reduce((acc, cur) => {
        const [arr1, arr2] = acc; 

        if (fn(cur)) {
            return [
                [...arr1, cur], 
                arr2
            ]
        } else {
            return [
                arr1, 
                [...arr2, cur]
            ]
        }
        
    }, [[] as T[], []as T[]]); 
}