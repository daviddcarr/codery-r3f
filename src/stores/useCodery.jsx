import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'

const useCodery = create( subscribeWithSelector( ( set ) => {
    return {
        currentScene: 2,

        setCurrentScene: ( scene ) => {
            set( { currentScene: scene } )
        },

        isLoading: true,

        setIsLoading: ( isLoading ) => {
            set( { isLoading: isLoading } )
        } 
    }
} ) )

export default useCodery