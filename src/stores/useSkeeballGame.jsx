import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware'

export default create( subscribeWithSelector( ( set, get ) => {
    return {
        playerScore: 0,
        addToPlayerScore: (points) => {
            set( (state) => {
                console.log('Core: addToPlayerScore ' + (state.playerScore + points))
                return {
                    playerScore: state.playerScore + points
                }
            } )
        }
    }
} ) )