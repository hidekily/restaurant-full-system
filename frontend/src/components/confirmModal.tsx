interface ModalProps{
    title: string,
    isOpen: boolean,
    onConfirm: () => void,
    onCancel: () => void
}

export function ConfirmModal({title, isOpen, onCancel, onConfirm}:ModalProps) {
    if(!isOpen){
        return null
    }

    return(
     <>
        <div className="fixed inset-0 bg-opacity-0 flex justify-center items-center border text-red-500">
            <section className="w-[45vw] h-[40vh] bg-zinc-800 to-indigo-900 flex flex-col rounded-2xl">
                <span className="h-[40%] w-full flex justify-center items-center">
                    <p className="text-red-700 text-lg">{title}</p>
                </span>
                <section className="h-[60%] w-full flex flex-row justify-center items-center gap-3 mb-5">
                    <button className="bg-green-500 w-[40%] h-[20%] rounded-lg border-green-200 text-zinc-900" 
                            onClick={onCancel} 
                        >
                            CANCEL
                    </button>
                    <button className="bg-red-900 w-[40%] h-[20%] rounded-lg text-black" 
                            onClick={onConfirm} 
                        >
                        CONFIRM
                    </button>
                </section>
            </section>
         </div>
     </>
    )
}