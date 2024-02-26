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
        },
        maxAttempts: 6,
        playerAttempts: 0,
        addPlayerAttempt: () => {
            set( (state) => {
                const newAttempts = state.playerAttempts + 1
                if ( newAttempts >= state.maxAttempts ) {
                    return {
                        playerAttempts: newAttempts,
                        gameEnded: true
                    }
                }
                return {
                    playerAttempts: newAttempts
                }
            } )
        },

        gameEnded : false,
        setGameEnded : () => {
            set( () => {
                return {
                    gameEnded: true
                }
            } )
        },

        resetGame : () => {
            set( () => {
                return {
                    playerScore: 0,
                    playerAttempts: 0,
                    gameEnded: false
                }
            } )
        }
    }
} ) )


export default useSkeeballGame