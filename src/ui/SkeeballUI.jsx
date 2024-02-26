import useSkeeballGame from "../stores/useSkeeballGame"

export default function SkeeballUI() {

    const [
        playerScore,
        maxAttempts,
        playerAttempts
     ] = useSkeeballGame((state) => [
        state.playerScore,
        state.maxAttempts,
        state.playerAttempts
     ])

    return (
        <div className="fixed inset-0 w-full h-screen z-50 pointer-events-none">
            <div className="absolute top-4 left-0 w-full text-white text-center text-2xl">
                <span>
                    Score: { playerScore }
                </span>
            </div>

            <div className="absolute bottom-4 left-0 w-full text-white text-center text-2xl">
                <span>
                    { playerAttempts } / { maxAttempts }
                </span>
            </div>
        </div>
    )

}