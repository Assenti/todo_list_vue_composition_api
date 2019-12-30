/** Imitation of DB for user data */
export const userData = {

    write: (name: string, value: string): boolean => {
        try {
            localStorage.setItem(name, value)
            return true
        } catch (e) {
            return false
        }
    },

    read: (name: string): string => {
        let result = localStorage.getItem(name)
        return result ? result : ''
    },

    remove: (name: string): boolean => {
        try {
            localStorage.removeItem(name)
            return true
        } catch (e) {
            return false
        }
    }
}