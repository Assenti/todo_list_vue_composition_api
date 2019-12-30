import { Todos } from '@/models';

/** Imitation of DB */
export const db = {

    write: (name: string, data: object): boolean => {
        try {
            localStorage.setItem(name, JSON.stringify(data))
            return true
        } catch (e) {
            return false
        }
    },

    read: (name: string): Todos => {
        let result = localStorage.getItem(name)
        return result ? JSON.parse(result) : { todos: []}
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