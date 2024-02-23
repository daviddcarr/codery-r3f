import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'

const useSkeeballGame = create( subscribeWithSelector( ( set ) => {
    return {
        playerScore: 0,
        addToPlayerScore: (points) => {
            set( (state) => {
                return {
                    playerScore: state.playerScore + points
                }
            } )
        }
    }
} ) )


export default useSkeeballGame