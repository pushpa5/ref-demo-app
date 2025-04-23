import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"

// // works in react 19 directly passing the ref as a prop
// export default function ResultModal({result, targetTime, ref}) {
//     return (
//         <dialog ref={ref} className="result-modal">
//             <h2>You {result}</h2>
//             <p>The target time was <strong>{targetTime}</strong> seconds.</p>
//             <p>You stopped the timer with <strong>X seconds left</strong></p>
//             <form method="dialog">
//                 <button>close</button>
//             </form>
//         </dialog>
//     )
// }

// in react 18 
const ResultModal = forwardRef(function ResultModal({ remainingTime, targetTime, onReset }, ref) {
    const youLost = remainingTime <= 0
    const timeLeft = (remainingTime / 1000).toFixed(2)
    const dialog = useRef()

    const score = Math.round((1 - (remainingTime / (targetTime * 1000))) * 100)

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal()
            }
        }
    })

    return (createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            <h2>{youLost ? 'You Lost' : `Your score: ${score}`}</h2>
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{timeLeft} seconds left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>close</button>
            </form>
        </dialog>, document.getElementById('modal'))
    )
})
export default ResultModal
